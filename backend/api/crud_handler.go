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

	// Handle based on HTTP method
	pkey := r.URL.Query().Get("pkey") // ex. 'AUGMENT#'
	pval := r.URL.Query().Get("pval") // ex. 'Pandoras Bench'
	email := r.URL.Query().Get("email")

	fmt.Printf("Request of some sort received: %s", r.URL.RawQuery)
	fmt.Printf("Query params: pkey: %s pval: %s", pkey, pval)
	fmt.Printf("Email param value: %s", email)
	switch r.Method {
	case "GET":
		if email != "" {
			h.handleGetByEmail(w, r, tableName, email)
		} else if pkey != "" && pval != "" {
			h.handleParameterizedGet(w, r, tableName, pkey, pval) // parameterized only means single table
		} else {
			h.handleGet(w, r, tableName) // fetches from all tables
		}

	case "POST":
		h.handlePost(w, r, tableName)
	case "PUT":
		h.handlePut(w, r, tableName)
	case "DELETE":
		h.handleDelete(w, r, tableName)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (h *CrudHandler) handleGetByEmail(w http.ResponseWriter, r *http.Request, tableName string, email string) {
	if tableName == "tft_builds" {
		items, err := h.crudAPI.GetBuildsByEmail(email)

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

		fmt.Println("items result", items)
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
	var payload struct {
		Key Key `json:"key"`
	}

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = h.crudAPI.Delete(tableName, payload.Key)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Item deleted successfully",
	})
}
