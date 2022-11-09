package models

type Migrations struct {
	Id   uint   `json:"id" gorm:"primary_key"`
	Name string `json:"name"`
}
