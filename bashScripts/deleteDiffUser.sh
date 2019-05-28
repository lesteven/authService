#!/bin/bash


curl -X DELETE localhost:3000/api/users/hello\
    -b cookie-file.txt \
    -H 'Content-Type: application/json'\
    -d '{"username":"hello","password":"123"}'\
    -v

