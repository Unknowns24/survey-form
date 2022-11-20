package libs

import (
	"backend/src/models"
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type DbConfig struct {
	Host     string
	Port     string
	Database string
	User     string
	Password string
	Charset  string
}

var DB *gorm.DB

func (c *DbConfig) InitMysqlDB() *gorm.DB {
	connString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=%s&parseTime=True&loc=Local", c.User, c.Password, c.Host, c.Port, c.Database, c.Charset)
	db, err := gorm.Open(mysql.Open(connString), &gorm.Config{})
	if err != nil {
		log.Panic(err)
		os.Exit(-1)
	}

	db.AutoMigrate(&models.User{}, &models.Migrations{}, &models.Survey{})

	return db
}
