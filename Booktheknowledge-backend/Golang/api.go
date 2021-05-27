package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB
var err error

func dbConfig() {
	// connect to amazon data base
	db, err = sql.Open("mysql", "root:password@tcp(172.17.0.3)/booktheknowledge")
	if err != nil {
		fmt.Println("Unable to connect to database")
		panic(err.Error())
	}
	fmt.Println("Connected")
}

func login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	w.Header().Set("Access-Control-Allow-Methods", "*")
	params := mux.Vars(r)
	emailAndPwd := params["id"]
	var email string = ""
	var password string = ""
	for i := 0; i < len(emailAndPwd); i++ {
		if string(emailAndPwd[i]) == "=" {
			for j := i + 1; j < len(emailAndPwd); j++ {
				password = password + string(emailAndPwd[j])
			}
			break
		}
		email = email + string(emailAndPwd[i])
	}

	result := make(map[string]string)
	statement, er := db.Query("SELECT * FROM login WHERE email=? AND password=?", email, password)
	var count = 0
	for statement.Next() {
		count++
	}
	if er != nil || count == 0 {
		result["status"] = "false"
		result["message"] = "Incorrect email/password"
		json.NewEncoder(w).Encode(result)
		fmt.Println("Fail")
		return

	}
	result["status"] = "true"
	result["message"] = "Authentication Successful"
	json.NewEncoder(w).Encode(result)
	fmt.Println("Success")

}

func main() {
	r := mux.NewRouter()
	dbConfig()
	r.HandleFunc("/login/{id}", login).Methods("GET")
	log.Fatal(http.ListenAndServe(":8000", r))
	defer db.Close()
}
