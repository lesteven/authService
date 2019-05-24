#!/bin/bash


curl -X DELETE localhost:3000/api/users/helloExists\
    -H 'Content-Type: application/json'\
    -d '{"username":"helloExists","password":"123"}'\
    -v

