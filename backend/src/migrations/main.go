package migrations

import (
	"backend/src/migrations/migration_files"
	"fmt"
)

func ExecMigrations() {
	// Populate Tables
	migration_files.MigrateUsers()

	fmt.Println("========================")
	fmt.Println("== MIGRATIONS SUCCESS ==")
	fmt.Println("========================")
}
