package controllers

import (
	"backend/src/libs"
	"backend/src/models"
	"backend/src/utils"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

func CreateSurvey(c *fiber.Ctx) error {
	surveyData := &models.SurveyContent{}

	err := utils.BodyInterfaceParser(c, surveyData)
	if err != nil {
		return c.SendString(err.Error())
	}
	// Se verifica que se encuentren todos los campos necesarios
	if surveyData.Title == "" || surveyData.Description == "" || len(surveyData.Options) == 0 || len(surveyData.Questions) == 0 {
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN103\"}"))
	}

	// Conseguimos la informacion del usuario que envio la peticion
	user := c.Context().UserValue("user").(models.User)

	optionsJson, err := json.Marshal(surveyData.Options)
	if err != nil {
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN112\"}"))
	}

	questionJson, err := json.Marshal(surveyData.Questions)
	if err != nil {
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN112\"}"))
	}

	newSurvey := models.Survey{
		OwnerId:   user.Id,
		Title:     surveyData.Title,
		Desc:      surveyData.Description,
		Options:   string(optionsJson),
		Questions: string(questionJson),
	}

	libs.DB.Create(&newSurvey)

	return c.SendString(utils.EndOutPut("{\"message\": \"SUCN103\"}"))
}

func GetSurveys(c *fiber.Ctx) error {
	user := c.Context().UserValue("user").(models.User)

	var surveys []models.Survey

	libs.DB.Model(models.Survey{}).Where("owner_id = ?", user.Id).Scan(&surveys)

	return c.JSON(surveys)
}
