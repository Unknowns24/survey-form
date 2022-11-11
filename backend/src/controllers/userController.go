package controllers

import (
	"backend/src/libs"
	"backend/src/middlewares"
	"backend/src/models"
	"backend/src/utils"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Register(c *fiber.Ctx) error {
	jsonData, err := utils.BodyParser(c)
	if err != nil {
		return c.SendString(err.Error())
	}

	// Se verifica que se encuentren todos los campos necesarios
	if jsonData["name"] == "" || jsonData["password"] == "" || jsonData["email"] == "" {
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN103\"}"))
	}

	// Se crea el modelo del nuevo usuario
	newUser := models.User{
		Email:     strings.ToLower(jsonData["email"]),
		Name:      utils.Caser.String(strings.ToLower(jsonData["name"])),
		CreatedAt: time.Now(),
	}

	// Se le asigna la contraseña al usuario
	newUser.SetPassword(jsonData["password"])

	// Se busca que no haya un usuario ya registrado con el email recibido
	var user models.User

	libs.DB.Where("email = ?", jsonData["email"]).First(&user)

	if user.Id != 0 {
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN104\"}"))
	}

	if err != nil {
		return c.SendString(err.Error())
	}

	// Create the user
	libs.DB.Create(&newUser)

	return c.SendString(utils.EndOutPut("{\"message\": \"SUCN100\"}"))
}

func Login(c *fiber.Ctx) error {
	jsonData, err := utils.BodyParser(c)
	if err != nil {
		return c.SendString(err.Error())
	}

	// Se verifica que se encuentren todos los campos necesarios
	if jsonData["password"] == "" || jsonData["email"] == "" || jsonData["keeplogin"] == "" {
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN103\"}"))
	}

	// Se busca que exista un usuario registrado con el email recibido
	var user models.User

	libs.DB.Where("email = ?", jsonData["email"]).First(&user)

	if user.Id == 0 {
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN105\"}"))
	}

	// Si existe el usuario se compararan las contraseñas
	if user.ComparePassword(jsonData["password"]) != nil {
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN107\"}"))
	}

	// Parseamos como booleano el parametro "keeplogin"
	keepLogin, err := strconv.ParseBool(jsonData["keeplogin"])
	if err != nil {
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN108\"}"))
	}

	// Generamos el JWT
	token, err := middlewares.GenerateJWT(user.Id, keepLogin)
	if err != nil {
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN109\"}"))
	}

	if keepLogin {
		cookie := fiber.Cookie{
			Name:     "jwt",
			Value:    token,
			Expires:  time.Now().Add(time.Hour * 24 * 7),
			HTTPOnly: true,
		}

		c.Cookie(&cookie)
		return c.SendString(utils.EndOutPut("{\"message\": \"SUCN101\"}"))

	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.SendString(utils.EndOutPut("{\"message\": \"SUCN101\"}"))
}

func Logout(c *fiber.Ctx) error {
	c.Context().SetUserValue("user", "")

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.SendString(utils.EndOutPut("{\"message\": \"SUCN102\"}"))
}

func User(c *fiber.Ctx) error {
	user := c.Context().UserValue("user").(models.User)

	return c.JSON(user)
}
