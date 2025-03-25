package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"
)

// CrudAPI handles CRUD operations through the API Gateway
type CrudAPI struct {
	apiGatewayURL string
}

// NewCrudAPI creates a new instance of the CRUD API client
func NewCrudAPI() *CrudAPI {
	// Get API Gateway URL from environment variables
	apiGatewayURL := os.Getenv("API_GATEWAY_URL")
	if apiGatewayURL == "" {
		apiGatewayURL = "https://mga0vgs4zg.execute-api.us-east-1.amazonaws.com/prod" // Default or fallback URL
	}

	return &CrudAPI{
		apiGatewayURL: apiGatewayURL,
	}
}

// TableItem represents a generic item in a DynamoDB table
type TableItem map[string]interface{}

// Key represents a DynamoDB primary key
type Key map[string]interface{}

// UpdateOperation represents parameters for an update operation
type UpdateOperation struct {
	Key                       Key                    `json:"Key"`
	UpdateExpression          string                 `json:"UpdateExpression"`
	ExpressionAttributeValues map[string]interface{} `json:"ExpressionAttributeValues"`
}

func (c *CrudAPI) GetAll(tableName string) ([]TableItem, error) {
	// Log the starting of the function and the table name
	tableName = "tft_items"
	log.Printf("GetAll function called for table: %s", tableName)

	// Build the URL with query parameters
	reqURL, err := url.Parse(c.apiGatewayURL + "/items/GET?TableName=tft_items")
	if err != nil {
		return nil, fmt.Errorf("error parsing API URL: %v", err)
	}

	// Log the full request URL for debugging
	fullURL := reqURL.String()
	// Add the query parameter for TableName
	// query := reqURL.Query()
	// query.Set("TableName", tableName) // Add TableName to query string
	// reqURL.RawQuery = query.Encode()  // Set the raw query part of the URL

	log.Printf("Making GET request to: %s", fullURL)

	// Make the GET request with a timeout
	client := &http.Client{
		Timeout: 30 * time.Second, // Add a reasonable timeout
	}

	resp, err := client.Get(fullURL)
	if err != nil {
		return nil, fmt.Errorf("error making GET request: %v", err)
	}
	defer resp.Body.Close()

	// Log the response status and headers
	log.Printf("Received response with status: %d", resp.StatusCode)
	log.Printf("Response Headers: %+v", resp.Header)

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %v", err)
	}

	// Log a truncated version of the response body for debugging
	bodyStr := string(body)
	if len(bodyStr) > 500 {
		log.Printf("Response body (truncated): %s...", bodyStr[:500])
	} else {
		log.Printf("Response body: %s", bodyStr)
	}

	// Check if the status code indicates an error
	if resp.StatusCode != http.StatusOK {
		// Try to parse as JSON error first
		var errorResp map[string]interface{}
		if err := json.Unmarshal(body, &errorResp); err == nil {
			// Log the full error structure for debugging
			log.Printf("API error details: %+v", errorResp)

			// Check various possible error field names
			for _, field := range []string{"error", "message", "errorMessage", "Error"} {
				if errMsg, ok := errorResp[field].(string); ok {
					return nil, fmt.Errorf("API error: %s", errMsg)
				}
			}

			// If we can't find a specific error message field, return the whole object
			errBytes, _ := json.Marshal(errorResp)
			return nil, fmt.Errorf("API error: %s", string(errBytes))
		}

		// Fallback to raw body if not JSON
		return nil, fmt.Errorf("API returned status code %d: %s", resp.StatusCode, string(body))
	}

	// Parse the response
	var result struct {
		Items []TableItem `json:"Items"`
	}

	// Check if the response might be directly returning Items array rather than an object
	if bodyStr[0] == '[' {
		log.Printf("Response appears to be a direct array, trying to parse as Items")
		var items []TableItem
		if err := json.Unmarshal(body, &items); err != nil {
			return nil, fmt.Errorf("error parsing response as array: %v", err)
		}
		return items, nil
	}

	// Try parsing as expected structure with Items field
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("error parsing response JSON: %v (body: %s)", err, bodyStr[:min(len(bodyStr), 200)])
	}

	log.Printf("Successfully parsed response, found %d items", len(result.Items))
	return result.Items, nil
}

// Create adds a new item to the specified table
func (c *CrudAPI) Create(tableName string, item TableItem) error {
	// Build the URL with query parameters
	reqURL, err := url.Parse(c.apiGatewayURL)
	if err != nil {
		return fmt.Errorf("error parsing API URL: %v", err)
	}

	q := reqURL.Query()
	q.Set("TableName", tableName)
	reqURL.RawQuery = q.Encode()

	// Marshal the item to JSON
	jsonData, err := json.Marshal(item)
	if err != nil {
		return fmt.Errorf("error marshaling item to JSON: %v", err)
	}

	// Create the POST request
	req, err := http.NewRequest("POST", reqURL.String(), bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("error creating request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")

	// Make the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("error making POST request: %v", err)
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("error reading response body: %v", err)
	}

	// Check if the status code indicates an error
	if resp.StatusCode != http.StatusOK {
		var errorResp map[string]string
		if err := json.Unmarshal(body, &errorResp); err == nil {
			return fmt.Errorf("API error: %s", errorResp["error"])
		}
		return fmt.Errorf("API returned status code %d: %s", resp.StatusCode, string(body))
	}

	return nil
}

// Update modifies an existing item in the specified table
func (c *CrudAPI) Update(tableName string, updateOp UpdateOperation) error {
	// Build the URL with query parameters
	reqURL, err := url.Parse(c.apiGatewayURL)
	if err != nil {
		return fmt.Errorf("error parsing API URL: %v", err)
	}

	q := reqURL.Query()
	q.Set("TableName", tableName)
	reqURL.RawQuery = q.Encode()

	// Marshal the update operation to JSON
	jsonData, err := json.Marshal(updateOp)
	if err != nil {
		return fmt.Errorf("error marshaling update operation to JSON: %v", err)
	}

	// Create the PUT request
	req, err := http.NewRequest("PUT", reqURL.String(), bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("error creating request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")

	// Make the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("error making PUT request: %v", err)
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("error reading response body: %v", err)
	}

	// Check if the status code indicates an error
	if resp.StatusCode != http.StatusOK {
		var errorResp map[string]string
		if err := json.Unmarshal(body, &errorResp); err == nil {
			return fmt.Errorf("API error: %s", errorResp["error"])
		}
		return fmt.Errorf("API returned status code %d: %s", resp.StatusCode, string(body))
	}

	return nil
}

// Delete removes an item from the specified table
func (c *CrudAPI) Delete(tableName string, key Key) error {
	// Build the URL with query parameters
	reqURL, err := url.Parse(c.apiGatewayURL)
	if err != nil {
		return fmt.Errorf("error parsing API URL: %v", err)
	}

	q := reqURL.Query()
	q.Set("TableName", tableName)
	reqURL.RawQuery = q.Encode()

	// Create the request payload
	payload := map[string]interface{}{
		"Key": key,
	}

	// Marshal the payload to JSON
	jsonData, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("error marshaling delete payload to JSON: %v", err)
	}

	// Create the DELETE request
	req, err := http.NewRequest("DELETE", reqURL.String(), bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("error creating request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")

	// Make the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("error making DELETE request: %v", err)
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("error reading response body: %v", err)
	}

	// Check if the status code indicates an error
	if resp.StatusCode != http.StatusOK {
		var errorResp map[string]string
		if err := json.Unmarshal(body, &errorResp); err == nil {
			return fmt.Errorf("API error: %s", errorResp["error"])
		}
		return fmt.Errorf("API returned status code %d: %s", resp.StatusCode, string(body))
	}

	return nil
}
