// main.go
package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"log"

	"teamfight-backend/api" // Replace with your actual module name
)

func main() {
	r := gin.Default()
	mux := http.NewServeMux()
	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Vite default port
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Routes
	r.GET("/champions", func(c *gin.Context) {
		// Handle Riot API logic
		c.JSON(http.StatusOK, gin.H{
			"message": "Champions data",
		})
	})

	// Register your CRUD API routes
	crudHandler := api.NewCrudHandler()
	crudHandler.RegisterRoutes(mux)

	// Register other routes as needed

	// Start the server
	log.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
