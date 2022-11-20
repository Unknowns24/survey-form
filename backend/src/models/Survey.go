package models

import (
	"time"
)

type Survey struct {
	Id        uint      `json:"id" gorm:"primary_key"`
	OwnerId   uint      `json:"-"`
	State     uint      `json:"state"`
	Title     string    `json:"title" gorm:"unique"`
	Desc      string    `json:"description" gorm:"type:text"`
	Options   string    `json:"options"`
	Questions string    `json:"answers"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type surveyOptions struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

type surveyQuestionsAnswer struct {
	Inclination string `json:"inclination"`
	Key         string `json:"key"`
	Value       string `json:"value"`
}

type surveyQuestions struct {
	Text    string                  `json:"text"`
	Value   string                  `json:"value"`
	Answers []surveyQuestionsAnswer `json:"answers"`
}

type SurveyContent struct {
	Title       string            `json:"title"`
	Description string            `json:"description"`
	Options     []surveyOptions   `json:"options"`
	Questions   []surveyQuestions `json:"questions"`
}
