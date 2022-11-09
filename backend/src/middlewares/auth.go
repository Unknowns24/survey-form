package middlewares

import (
	"backend/src/libs"
	"backend/src/models"
	"backend/src/utils"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func IsAuthenticated(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(utils.ENV.APP_JWT_KEY), nil
	})

	if err != nil || !token.Valid {
		c.Status(fiber.StatusUnauthorized)
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN500\"}"))
	}

	payload := token.Claims.(*jwt.RegisteredClaims)

	id, _ := strconv.Atoi(payload.Subject)

	var user models.User

	libs.DB.Where("id = ?", id).First(&user)

	if user.Id == 0 {
		c.Status(fiber.StatusUnauthorized)
		return c.SendString(utils.EndOutPut("{\"message\": \"ERRN501\"}"))
	}

	c.Context().SetUserValue("user", user) // Guardamos el usuario como una variable del contexto
	return c.Next()
}

func GenerateJWT(id uint, keeplogin bool) (string, error) {
	payload := jwt.RegisteredClaims{}
	payload.Subject = strconv.Itoa(int(id))
	payload.ExpiresAt = jwt.NewNumericDate(time.Now().Add(time.Hour * 24)) // JWT Have 1 day of duration

	if keeplogin {
		payload.ExpiresAt = jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 7)) // JWT Have 1 week of duration
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, payload).SignedString([]byte(utils.ENV.APP_JWT_KEY))

	return token, err
}
