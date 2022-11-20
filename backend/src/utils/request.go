package utils

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func EndOutPut(str string) (res string) {
	return str
}

func BodyParser(c *fiber.Ctx) (map[string]string, error) {
	var bodyData map[string]string

	// Se crea una variable donde se guardara el parseo del json que se encontraba codificado en base64
	var jsonData map[string]string

	// Se parsea el contenido enviado en el cuerpo
	if err := c.BodyParser(&bodyData); err != nil {
		return jsonData, errors.New(EndOutPut("{\"message\": \"ERRN100\"}"))
	}

	// Se verifica que exista el campo data dentro del json del body
	if bodyData["data"] == "" {
		return jsonData, errors.New(EndOutPut("{\"message\": \"ERRN101\"}"))
	}

	// Se decodifica en base64 el valor del campo data
	decoded, err := base64.StdEncoding.DecodeString(bodyData["data"])

	// Se verifica que no haya ocurrido un error al decodificar el base64
	if err != nil {
		return jsonData, errors.New(EndOutPut("{\"message\": \"ERRN102\"}"))
	}

	// Se parsea el json codificado en base64
	err = json.Unmarshal([]byte(string(decoded)), &jsonData)
	if err != nil {
		fmt.Println(err.Error())
		return jsonData, errors.New(EndOutPut("{\"message\": \"ERRN111\"}"))
	}

	return jsonData, nil
}

func BodyInterfaceParser(c *fiber.Ctx, jsonData interface{}) error {
	var bodyData map[string]string

	// Se parsea el contenido enviado en el cuerpo
	if err := c.BodyParser(&bodyData); err != nil {
		return errors.New(EndOutPut("{\"message\": \"ERRN100\"}"))
	}

	// Se verifica que exista el campo data dentro del json del body
	if bodyData["data"] == "" {
		return errors.New(EndOutPut("{\"message\": \"ERRN101\"}"))
	}

	// Se decodifica en base64 el valor del campo data
	decoded, err := base64.StdEncoding.DecodeString(bodyData["data"])

	// Se verifica que no haya ocurrido un error al decodificar el base64
	if err != nil {
		return errors.New(EndOutPut("{\"message\": \"ERRN102\"}"))
	}

	// Se parsea el json codificado en base64
	err = json.Unmarshal([]byte(string(decoded)), &jsonData)
	if err != nil {
		fmt.Println(err.Error())
		return errors.New(EndOutPut("{\"message\": \"ERRN111\"}"))
	}

	return nil
}
