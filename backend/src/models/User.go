package models

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id        uint      `json:"id" gorm:"primary_key"`
	Email     string    `json:"email" gorm:"unique"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Password  []byte    `json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (user *User) SetPassword(password string) {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 10)
	user.Password = hashedPassword
}

func (user *User) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}

func (user *User) Name() string {
	return user.FirstName + " " + user.LastName
}
