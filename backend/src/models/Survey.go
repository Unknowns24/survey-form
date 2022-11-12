package models

import (
	"time"
)

type Survey struct {
	Id        uint      `json:"id" gorm:"primary_key"`
	OwnerId   uint      `json:"-"`
	Title     string    `json:"title" gorm:"unique"`
	Desc      string    `json:"description"`
	Optins    string    `json:"Options" gorm:"type:text"`
	Answers   string    `json:"Answers" gorm:"type:text"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
