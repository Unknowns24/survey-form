package routes

import (
	"backend/src/controllers"
	"backend/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("/api/v1")

	// User Routes //
	api.Post("/login", controllers.Login)
	api.Post("/register", controllers.Register)

	authenticated := api.Use(middlewares.IsAuthenticated)

	// User Routes //
	authenticated.Get("/user", controllers.User)
	authenticated.Post("/logout", controllers.Logout)

}
