package migration_files

import (
	"backend/src/libs"
	"backend/src/models"
	"time"
)

func MigrateUsers() {
	var thereIsUser models.User

	libs.DB.Where("email = ?", "unknowns0074@gmail.com").First(&thereIsUser)

	// If unknowns0074@gmail.com is registered return execution
	if (thereIsUser.Id) != 0 {
		return
	}

	user := models.User{
		Name:      "Genaro",
		Email:     "unknowns0074@gmail.com",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	user.SetPassword("e3274be5c857fb42ab72d786e281b4b8") // adminpassword

	libs.DB.Create(&user)

	if user.Id == 0 {
		libs.DB.Model(&models.User{}).Where("email = ?", "unknowns0074@gmail.com").Find(&user)
	}
}
