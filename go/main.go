package main

import (
	"encoding/json"
	"flag"
	"github.com/gorilla/handlers"
	log "github.com/sirupsen/logrus"
	"io"
	"net/http"
	"os"
)

var Conf = &Config{}

func main() {
	err := initLog()
	if err != nil {
		log.Error("Cannot init logs: ", err)
	}
	log.Info("Starting...")
	var cnf = flag.String("c", "conf.json", "Config file name (in a current dir)")
	flag.Parse()
	log.Info("Loading with config: ", *cnf)

	initConfiguration(*cnf, Conf)

	runRest()
}

func runRest() {


	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir(Conf.StaticPath)))

	log.Printf("starting REST server on %s", Conf.ListenPort)

	allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	allowedOrigins := handlers.AllowedOrigins([]string{"*"})
	allowedMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})

	err := http.ListenAndServe(
		Conf.ListenPort,
		handlers.CORS(allowedHeaders, allowedOrigins, allowedMethods)(mux))
	if err != nil {
		log.Fatal(err)
	}
}

func initLog() error {

	Formatter := new(log.TextFormatter)
	Formatter.TimestampFormat = "15:04:05.000 02-01-2006"
	Formatter.FullTimestamp = true
	log.SetFormatter(Formatter)
	log.SetLevel(log.DebugLevel)

	mw := io.MultiWriter(os.Stdout)
	log.SetOutput(mw)

	return nil
}

func initConfiguration(file string, conf interface{}) {
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
	ListenPort   string `json:"port"`
	StaticPath   string `json:"static_path"`
}
