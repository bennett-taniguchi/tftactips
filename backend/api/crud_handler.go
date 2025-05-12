package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// CrudHandler handles HTTP requests for CRUD operations
type CrudHandler struct {
	crudAPI *CrudAPI
}

// NewCrudHandler creates a new instance of CrudHandler
func NewCrudHandler() *CrudHandler {
	return &CrudHandler{
		crudAPI: NewCrudAPI(),
	}
}

// RegisterRoutes registers the CRUD API routes with the given mux
func (h *CrudHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/crud/", h.handleCrud)
}

// handleCrud is the main handler for CRUD operations
func (h *CrudHandler) handleCrud(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight OPTIONS requests
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Get table name from query parameters
	tableName := r.URL.Query().Get("table")
	if tableName == "" {
		http.Error(w, "Missing table parameter", http.StatusBadRequest)
		return
	}

	// Set content type for responses
	w.Header().Set("Content-Type", "application/json")

	// retrieving query-strings to determine r.Method sub-case
	pkey := r.URL.Query().Get("pkey") // ex. 'AUGMENT#'
	pval := r.URL.Query().Get("pval") // ex. 'Pandoras Bench'
	email := r.URL.Query().Get("email")
	token := r.URL.Query().Get("token")
	id := r.URL.Query().Get("id")

	tokenValidated := false
	buildSlotsValidated := false
	// if we are getting user-specific data or modifying data, must have valid token!
	if token != "" || r.Method != "GET" || tableName == "tft_builds" && r.Method != "GET" { // err without && statementn for some reason
		tokenValidated = validateToken(w, token, email)
		if !tokenValidated {
			http.Error(w, "Token Invalid", http.StatusBadRequest)
			return
		}
	}
	// verify enough build spaces left && if we are dealing with a non generic get all case
	if r.Method == "POST" && tableName == "tft_builds" || r.Method == "PUT" && tableName == "tft_builds" {
		buildSlotsValidated = validateBuildSlots(w, h, email)
		if !buildSlotsValidated {
			http.Error(w, "Too Many Builds", http.StatusBadRequest)
			return
		}
	}
	userSpecificTable := tableName == "tft_builds" || tableName == "tft_users"

	staticTable := tableName == "tft_augments" || tableName == "tft_champions" || tableName == "tft_items" || tableName == "tft_traits"
	if !userSpecificTable && !staticTable {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
	fmt.Println("id:", id, "email:", email, "pkey", pkey, "pval", pval)
	switch r.Method {
	case "GET":
		// add specific tables to check { better to have covered by invariant before}
		// need to add specific flags to request
		if id != "" && email != "" || pkey != "" && pval != "" {
			// single param get, needs to be authenticated to prevent abuse

			if tokenValidated {
				if pkey != "" && pval != "" && id == "" {
					fmt.Println("handle parameterized get case")
					h.handleParameterizedGet(w, r, tableName, pkey, pval) // grab by passed partition key&value
				} else {
					fmt.Println("handle get by index case")
					h.handleGetByIndex(w, r, tableName, "id-index", id) // grab by passed partition key&value
				}

			}
		} else if email != "" {
			//  using the fact we don't pass pkey pval
			fmt.Println("handle   get by email case")
			h.handleGetByIndex(w, r, tableName, "email-index", email) // get all builds by email
		} else {
			// need to be fixed
			fmt.Println("handle unimplemented get case")
			if tableName != "tft_builds" && tableName != "tft_users" {
				h.handleGet(w, r, tableName) // fetches from all tables
			} else {
				http.Error(w, "Cannot fetch all for given table", http.StatusBadRequest)
			}

		}

	case "POST":
		// createBuilds hits here
		if tokenValidated && buildSlotsValidated && userSpecificTable {
			h.handlePost(w, r, tableName)
		}

	case "PUT":
		if tokenValidated && buildSlotsValidated && userSpecificTable {
			h.handlePut(w, r, tableName)
		}
	case "DELETE":
		if tokenValidated && buildSlotsValidated && userSpecificTable {
			h.handleDelete(w, r, tableName)
		}
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (h *CrudHandler) handleGetByIndex(w http.ResponseWriter, r *http.Request, tableName string, indexName string, indexValue string) {
	if tableName == "tft_builds" {
		items, err := h.crudAPI.GetBuildsByIndex(indexName, indexValue)

		if err != nil {

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{
				"error": fmt.Sprintf("Failed to fetch items: %v", err),
			})
			fmt.Println("error of some sort", err)
			fmt.Println("items returned for error of some sort", items)
			return
		}

		//fmt.Println("items result", items)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"items": items,
		})

	}

}

func (h *CrudHandler) handleParameterizedGet(w http.ResponseWriter, r *http.Request, tableName string, pkey string, pval string) {

	items, err := h.crudAPI.GetByPartitionKey(tableName, pkey, pval)
	if err != nil {
		log.Printf("Error fetching items from %s: on PKEY: %s with PVAL: %s %v", tableName, pkey, pval, err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": fmt.Sprintf("Failed to fetch items: %v", err),
		})
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"items": items,
	})
}

// handleGet handles GET requests to retrieve all items from a table
func (h *CrudHandler) handleGet(w http.ResponseWriter, r *http.Request, tableName string) {
	items, err := h.crudAPI.GetAll(tableName)
	if err != nil {
		log.Printf("Error fetching items from %s: %v", tableName, err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{
			"error": fmt.Sprintf("Failed to fetch items: %v", err),
		})
		return
	}
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"items": items,
	})

}

// handlePost handles POST requests to create a new item
func (h *CrudHandler) handlePost(w http.ResponseWriter, r *http.Request, tableName string) {
	var item TableItem

	err := json.NewDecoder(r.Body).Decode(&item)

	if err != nil {
		errorResponse := map[string]string{
			"error": err.Error(),
		}

		// Marshal to JSON and write response
		jsonResp, _ := json.Marshal(errorResponse)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(jsonResp)
		return
	}

	err = h.crudAPI.Create(tableName, item)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Item created successfully",
	})
}

// handlePut handles PUT requests to update an existing item
func (h *CrudHandler) handlePut(w http.ResponseWriter, r *http.Request, tableName string) {
	var updateOp UpdateOperation

	err := json.NewDecoder(r.Body).Decode(&updateOp)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = h.crudAPI.Update(tableName, updateOp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Item updated successfully",
	})
}

// handleDelete handles DELETE requests to remove an item
func (h *CrudHandler) handleDelete(w http.ResponseWriter, r *http.Request, tableName string) {
	fmt.Println("before struct")
	key := r.URL.Query().Get("pkey")
	val := r.URL.Query().Get("pval")
	metadata := r.URL.Query().Get("metadata")
	fmt.Println("Deleting from table:", tableName)
	fmt.Println("key: ", (key))
	fmt.Println("val: ", (val))

	err := h.crudAPI.Delete(tableName, key, val, metadata)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Item deleted successfully",
	})
}
