package utils

import (
	"github.com/spf13/viper"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

var ENV Config
var Caser = cases.Lower(language.AmericanEnglish)

// All app config is stored in this structure
// The values are read by viper from a config file or enviroment variables

type Config struct {
	// General Config
	APP_PORT    string `mapstructure:"APP_PORT"`
	APP_JWT_KEY string `mapstructure:"APP_JWT_TOKEN"`

	// Database Config
	DB_HOST     string `mapstructure:"DB_HOST"`
	DB_PORT     string `mapstructure:"DB_PORT"`
	DB_NAME     string `mapstructure:"DB_NAME"`
	DB_USER     string `mapstructure:"DB_USER"`
	DB_PASSWORD string `mapstructure:"DB_PASS"`
	DB_CHARSET  string `mapstructure:"DB_CHAR"`
}

// LoadConfig reads configuration from file or enviroment variables
func LoadConfig() (config Config, err error) {
	viper.AddConfigPath("./")
	viper.AddConfigPath("./..")
	viper.AddConfigPath("/")
	viper.AddConfigPath("/..")
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}

func PublishCfg(c Config) {
	ENV = c
}
