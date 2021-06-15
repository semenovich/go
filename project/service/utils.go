package service

import (
	"encoding/json"
	"io"
	log "github.com/sirupsen/logrus"
	"os"
)

func InitLog() error {
	Formatter := new(log.TextFormatter)
	Formatter.TimestampFormat = "15:04:05.000 02-01-2006"
	Formatter.FullTimestamp = true
	log.SetFormatter(Formatter)
	log.SetLevel(log.DebugLevel)
	mw := io.MultiWriter(os.Stdout)
	log.SetOutput(mw)
	return nil
}

func InitConfiguration(file string, conf interface{}) {
	configFile, err := os.Open(file)
	defer configFile.Close()
	if err != nil {
		log.Fatal("Couldn't load config: ", err)
	}

	jsonParser := json.NewDecoder(configFile)
	jsonParser.Decode(&conf)
	log.Info("Loading config: ", conf)
}

type Config struct {
	ListenPort string `json:"port"`
	StaticPath string `json:"static_path"`
}