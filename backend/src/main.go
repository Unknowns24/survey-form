package main

import (
	"backend/src/libs"
	"backend/src/routes"
	"backend/src/utils"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	config, err := utils.LoadConfig() // Getting the ENV Values

	// Cheking errors
	if err != nil {
		fmt.Println("FATAL ERROR!!!\nCannot load config file:", err)
		return
	}

	// Publishing the env globally for the app
	utils.PublishCfg(config)

	// Setting database connection data
	dbCfg := libs.DbConfig{
		Host:     utils.ENV.DB_HOST,
		Port:     utils.ENV.DB_PORT,
		Database: utils.ENV.DB_NAME,
		User:     utils.ENV.DB_USER,
		Password: utils.ENV.DB_PASSWORD,
		Charset:  utils.ENV.DB_CHARSET,
	}

	// Opening the database connection
	libs.DB = dbCfg.InitMysqlDB()

	// Migrate data if not migrated
	utils.MigrateData()

	// Creating the app
	app := fiber.New(fiber.Config{
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
	})

	// Middlewares
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowHeaders:     "Content-Type, Authorization",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))

	// If not exist create logs folder
	os.Mkdir("./logs", 0755)

	file, err := os.OpenFile("./logs/requests.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		defer file.Close()
		errCreating := ioutil.WriteFile("./logs/requests.log", []byte(""), 0755)
		if errCreating != nil {
			log.Fatalf("error opening or creating file: %v", errCreating)
		}
	}

	app.Use(logger.New(logger.Config{
		Format: "[${time}] (${status}) - ${ip} | Method: ${method} | Path: ${path} | Latency: ${latency} \n",
		Output: file,
	}))

	app.Use(recover.New())

	// Importing routes
	routes.Setup(app)

	// Starting app
	app.Listen(utils.ENV.APP_PORT)
}
