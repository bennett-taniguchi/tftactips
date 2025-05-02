package api

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/lestrrat-go/jwx/v3/jwe"

	"io/ioutil"
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
		body, _ := ioutil.ReadAll(resp.Body)
		return nil, fmt.Errorf("request failed with status %d: %s", resp.StatusCode, body)
	}

	// Read and parse the response
	body, err := ioutil.ReadAll(resp.Body)
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
