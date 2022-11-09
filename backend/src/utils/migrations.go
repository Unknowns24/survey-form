package utils

import (
	"backend/src/libs"
	"backend/src/migrations"
	"backend/src/models"
)

func MigrateData() {
	var migration models.Migrations
	// Check if there is a previous migration
	libs.DB.Where("name = ?", "install").First(&migration)
	// If there is a previous migration return
	if migration.Id != 0 {
		return
	}
	// If there isn't  a previuos migration then migrate
	migrations.ExecMigrations()
	// Create migration record
	libs.DB.Create(&models.Migrations{Name: "install"})
}
