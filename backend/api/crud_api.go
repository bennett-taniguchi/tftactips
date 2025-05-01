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
	"strings"
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

func finalUrlIndex(tableName string, op string, gatewayUrl string, indexName string, email string) string {
	tableArr := strings.Split(tableName, "_")
	table := tableName
	if len(tableArr) == 2 {
		table = tableArr[1]
	}

	apiRoute := gatewayUrl + "/" + table + "/" + op + "?TableName=" + tableName + "&IndexName=" + indexName + "&email=" + email
	log.Print("FINALAPIROUTE", apiRoute)
	return apiRoute
}
func finalUrlPartition(tableName string, op string, gatewayUrl string, pKey string, pVal string) string {
	tableArr := strings.Split(tableName, "_")
	table := tableName
	if len(tableArr) == 2 {
		table = tableArr[1]
	}

	apiRoute := gatewayUrl + "/" + table + "/" + op + "?TableName=" + tableName + "&PartitionKey=" + pKey + "&PartitionValue=" + pVal
	log.Print("FINALAPIROUTE", apiRoute)
	return apiRoute
}

// tableName: items,augments,etc.
// op: GET,POST,...
func finalUrl(tableName string, op string, gatewayUrl string) string {
	tableArr := strings.Split(tableName, "_")
	table := tableName
	if len(tableArr) == 2 {
		table = tableArr[1]
	}

	apiRoute := gatewayUrl + "/" + table + "/" + op + "?TableName=" + tableName
	log.Print("FINALAPIROUTE", apiRoute)
	return apiRoute
}

func (c *CrudAPI) GetBuildsByEmail(email string) ([]TableItem, error) {

	apiRoute := finalUrlIndex("tft_builds", "GET", c.apiGatewayURL, "email-index", email)
	reqURL, err := url.Parse(apiRoute)
	if err != nil {
		return nil, fmt.Errorf("error parsing API URL: %v", err)
	}
	fullURL := reqURL.String()

	// Make the GET request with a timeout
	client := &http.Client{
		Timeout: 30 * time.Second, // Add a reasonable timeout
	}

	resp, err := client.Get(fullURL)
	if err != nil {
		return nil, fmt.Errorf("error making GET request: %v", err)
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %v", err)
	}

	// Parse the response
	var result struct {
		Items []TableItem `json:"Items"`
	}
	bodyStr := string(body)
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

func (c *CrudAPI) GetByPartitionKey(tableName string, pkey string, pval string) ([]TableItem, error) {
	apiRoute := finalUrlPartition(tableName, "GET", c.apiGatewayURL, pkey, pval)

	log.Printf("GetAll function called for table: %s and pkey %s and pval %s", tableName, pkey, pval)
	log.Print(" ApiRoute: ", apiRoute)

	reqURL, err := url.Parse(apiRoute)
	if err != nil {
		return nil, fmt.Errorf("error parsing API URL: %v", err)
	}

	fullURL := reqURL.String()

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

func (c *CrudAPI) GetAll(tableName string) ([]TableItem, error) {

	apiRoute := finalUrl(tableName, "GET", c.apiGatewayURL)

	log.Printf("GetAll function called for table: %s", tableName)
	log.Print(" ApiRoute: ", apiRoute)

	reqURL, err := url.Parse(apiRoute)
	if err != nil {
		return nil, fmt.Errorf("error parsing API URL: %v", err)
	}

	fullURL := reqURL.String()

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
// Create adds a new item to the specified table
func (c *CrudAPI) Create(tableName string, item TableItem) error {
	tableArr := strings.Split(tableName, "_")
	table := tableName
	if len(tableArr) == 2 {
		table = tableArr[1]
	}

	// 1. Build the URL
	reqURL, err := url.Parse(c.apiGatewayURL + "/" + table + "/POST")
	if err != nil {
		log.Printf("Error parsing API URL: %v", err)
		return fmt.Errorf("error parsing API URL: %v", err)
	}

	q := reqURL.Query()
	q.Set("TableName", tableName)
	reqURL.RawQuery = q.Encode()

	// 2. Extract partition key from the item
	partitionKey, _, err := extractPartitionKey(item)
	if err != nil {
		log.Printf("Error extracting partition key: %v", err)
		return err // This error is now properly formatted
	}

	// 3. Use the item as is - don't try to restructure it if it already has a partition key
	if partitionKey != "" {
		// Item already has a partition key, use it directly
		return sendRequest(reqURL.String(), item)
	}

	// 4. Structure the item for DynamoDB if no partition key was found
	dynamoItem := map[string]interface{}{
		"BUILD#":   item["name"], // Use name as partition key
		"METADATA": item["id"],
		// Copy remaining fields
	}

	for key, value := range item {
		if key != "id" && key != "name" {
			dynamoItem[key] = value
		}
	}

	return sendRequest(reqURL.String(), dynamoItem)
}

// Helper function to extract partition key
// Helper function to extract partition key
func extractPartitionKey(item TableItem) (string, string, error) {
	// Check for pkey/pval format first
	if pkey, ok := item["pkey"].(string); ok {
		if pval, ok := item["pval"].(string); ok {
			return pkey, pval, nil
		}
	}

	// Try other formats if that doesn't work
	if buildVal, ok := item["BUILD#"].(string); ok {
		return "BUILD#", buildVal, nil
	}

	// Check for partitionKey structure
	if partitionKeyMap, ok := item["partitionKey"].(map[string]interface{}); ok {
		for key, value := range partitionKeyMap {
			if strings.HasSuffix(key, "#") {
				strValue, ok := value.(string)
				if !ok {
					return key, fmt.Sprintf("%v", value), nil
				}
				return key, strValue, nil
			}
		}
	}

	// Use name as a fallback
	if name, ok := item["name"].(string); ok {
		return "BUILD#", name, nil
	}

	// Return error as JSON
	return "", "", fmt.Errorf("no valid partition key found")
}

// Helper function to extract metadata fields
// currently it is id
func extractNonMetadata(item TableItem) map[string]interface{} {
	metadata := make(map[string]interface{})
	for key, value := range item {
		if key != "id" && key != "name" && key != "partitionKey" { // do not accept the actual metadata, or aliases for partitionkey
			metadata[key] = value
		}
	}
	return metadata
}

// Helper function to send the request and process response
// Update the sendRequest function to handle errors properly
func sendRequest(url string, data interface{}) error {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("error marshaling item to JSON: %v", err)
	}

	//log.Printf("Request URL: %s", url)
	log.Println()
	log.Printf("Request data: %s", string(jsonData))
	log.Println()

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("error creating request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("error making POST request: %v", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("error reading response body: %v", err)
	}

	if resp.StatusCode != http.StatusOK {
		return handleErrorResponse(resp.StatusCode, body)
	}

	return nil
}

// Helper function to handle error responses
func handleErrorResponse(statusCode int, body []byte) error {
	// First try to parse the body as JSON
	var errorResp map[string]interface{}
	if err := json.Unmarshal(body, &errorResp); err == nil {
		// Body is already valid JSON
		log.Printf("API error details: %+v", errorResp)

		// Check various possible error field names
		for _, field := range []string{"error", "message", "errorMessage", "Error"} {
			if errMsg, ok := errorResp[field].(string); ok {
				return fmt.Errorf("API error: %s", errMsg)
			}
		}

		errBytes, _ := json.Marshal(errorResp)
		return fmt.Errorf("API error: %s", string(errBytes))
	}

	// Body is not JSON, so return the raw string
	return fmt.Errorf("API returned status code %d: %s", statusCode, string(body))
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
