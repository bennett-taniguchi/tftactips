package api

import (
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/lestrrat-go/jwx/v3/jwe"

	"net/http"
)

// func Example_jwe_parse() {
// 	const src = `eyJhbGciOiJSU0ExXzUiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.KrFTaMKVY_iUKYYk905QjbUf_fpBXvXCzIAfbPoPMGViDzxtgz5qnch8waV7wraVDfzpW7JfPOw6Nz_-XRwN3Vbud48bRYFw92GkC0M6kpKFpl_xgZxGN47ggNk9hzgqd7mFCuyufeYdn5c2fPoRZAV4UxvakLozEYcQo-eZaFmoYS4pyoC-IKKRikobW8n__LksMzXc_Vps1axn5kdpxsKQ4k1oayvUrgWX2PMxKn_TcLEKHtCN7qRlJ5hkKbZAXAdd34zGWcFV5gc1tcLs6HFhnebo8GUgItTYWBKSKzF6MyLJNRSUPFVq9q-Jxi1juXIlDrv_7rHVsdokQmBfvA.bK7z7Z3gEzFDgDQvNen0Ww.2hngnAVrmucUpJKLgIzYcg.CHs3ZP7JtG430Dl9YAKLMAl`

// 	msg, err := jwe.Parse([]byte(src))
// 	if err != nil {
// 		fmt.Printf("failed to parse JWE message: %s\n", err)
// 		return
// 	}

// 	json.NewEncoder(os.Stdout).Encode(msg)
// 	// OUTPUT:
// 	// {"ciphertext":"2hngnAVrmucUpJKLgIzYcg","encrypted_key":"KrFTaMKVY_iUKYYk905QjbUf_fpBXvXCzIAfbPoPMGViDzxtgz5qnch8waV7wraVDfzpW7JfPOw6Nz_-XRwN3Vbud48bRYFw92GkC0M6kpKFpl_xgZxGN47ggNk9hzgqd7mFCuyufeYdn5c2fPoRZAV4UxvakLozEYcQo-eZaFmoYS4pyoC-IKKRikobW8n__LksMzXc_Vps1axn5kdpxsKQ4k1oayvUrgWX2PMxKn_TcLEKHtCN7qRlJ5hkKbZAXAdd34zGWcFV5gc1tcLs6HFhnebo8GUgItTYWBKSKzF6MyLJNRSUPFVq9q-Jxi1juXIlDrv_7rHVsdokQmBfvA","header":{"alg":"RSA1_5"},"iv":"bK7z7Z3gEzFDgDQvNen0Ww","protected":"eyJhbGciOiJSU0ExXzUiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0","tag":"CHs3ZP7JtG430Dl9YAKLMAk"}
// }

func Token_jwe_parse(tok string) {
	src := tok

	msg, err := jwe.Parse([]byte(src))
	if err != nil {
		fmt.Printf("failed to parse JWE message: %s\n", err)
		return
	}

	json.NewEncoder(os.Stdout).Encode(msg)

	// OUTPUT:
	// {"ciphertext":"2hngnAVrmucUpJKLgIzYcg","encrypted_key":"KrFTaMKVY_iUKYYk905QjbUf_fpBXvXCzIAfbPoPMGViDzxtgz5qnch8waV7wraVDfzpW7JfPOw6Nz_-XRwN3Vbud48bRYFw92GkC0M6kpKFpl_xgZxGN47ggNk9hzgqd7mFCuyufeYdn5c2fPoRZAV4UxvakLozEYcQo-eZaFmoYS4pyoC-IKKRikobW8n__LksMzXc_Vps1axn5kdpxsKQ4k1oayvUrgWX2PMxKn_TcLEKHtCN7qRlJ5hkKbZAXAdd34zGWcFV5gc1tcLs6HFhnebo8GUgItTYWBKSKzF6MyLJNRSUPFVq9q-Jxi1juXIlDrv_7rHVsdokQmBfvA","header":{"alg":"RSA1_5"},"iv":"bK7z7Z3gEzFDgDQvNen0Ww","protected":"eyJhbGciOiJSU0ExXzUiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0","tag":"CHs3ZP7JtG430Dl9YAKLMAk"}
}

// UserInfo represents the response from Auth0's userinfo endpoint
type UserInfo struct {
	Email         string `json:"email"`
	EmailVerified bool   `json:"email_verified"`
	Name          string `json:"name,omitempty"`
	Nickname      string `json:"nickname,omitempty"`
	Sub           string `json:"sub"`
}

// GetUserInfo retrieves user information from Auth0 using an access token
func GetUserInfo(accessToken string) (*UserInfo, error) {
	// Get your Auth0 domain from environment variable
	//domain := os.Getenv("AUTH0_DOMAIN") // e.g., "your-tenant.auth0.com"
	domain := "dev-a0oi0uq2ah7wnkxf.us.auth0.com"
	if domain == "" {
		return nil, fmt.Errorf("AUTH0_DOMAIN environment variable not set")
	}

	// Create request to userinfo endpoint
	url := fmt.Sprintf("https://%s/userinfo", domain)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}

	// Add the access token as Bearer token in the Authorization header
	req.Header.Add("Authorization", "Bearer "+accessToken)

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to make request: %v", err)
	}
	defer resp.Body.Close()

	// Check for successful response
	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("request failed with status %d: %s", resp.StatusCode, body)
	}

	// Read and parse the response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %v", err)
	}

	// Parse JSON response into UserInfo struct
	var userInfo UserInfo
	if err := json.Unmarshal(body, &userInfo); err != nil {
		return nil, fmt.Errorf("failed to parse response: %v", err)
	}

	return &userInfo, nil
}

func validateToken(w http.ResponseWriter, token string, email string) bool {

	fmt.Println("token case hit")
	// use old method to grab domain or keep hardcoding
	userInfo, err := GetUserInfo(token)
	if err != nil {
		fmt.Printf("Error somehow: %s", err)
		http.Error(w, "Error with userInfo", http.StatusMethodNotAllowed)
	} else {
		fmt.Print("user info:", userInfo)
	}

	fmt.Println("check equality", email == userInfo.Email)

	if email != userInfo.Email {
		http.Error(w, "Invalid Email value(s), not equal from token", http.StatusMethodNotAllowed)
		return false
	}

	return true

}

// Returns TRUE if validated properly, Returns FALSE if too many builds currently exist per user
func validateBuildSlots(w http.ResponseWriter, h *CrudHandler, email string) bool {
	if email != "" {
		res, err := h.crudAPI.GetBuildsByIndex("email-index", email)
		if err == nil {

			fmt.Println("length of curr builds:", len(res))
			if len(res) >= 10 {
				http.Error(w, "Error too many builds", http.StatusNotExtended)
				return false
			}
		} else {
			fmt.Println("err getting builds", err)
		}
	} else {
		fmt.Println("err no email provided")
		return false
	}

	return true
}
