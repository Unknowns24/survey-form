package controllers

import (
	"backend/src/utils"

	"github.com/gofiber/fiber/v2"
)

func CreateSurvey(c *fiber.Ctx) error {
	jsonData, err := utils.BodyParser(c)
	if err != nil {
		return c.SendString(err.Error())
	}

	// Se verifica que se encuentren todos los campos necesarios
	if jsonData["title"] == "" || jsonData["description"] == "" || jsonData["options"] == "" || jsonData["questions"] == "" {
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN103\"}"))
	}

	return c.SendString(utils.EndOutPut("{\"message\": \"SUCN103\"}"))
}
