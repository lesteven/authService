#!/bin/bash


curl -X DELETE localhost:3000/api/users/hey\
    -b cookie-file.txt \
    -H 'Content-Type: application/json'\
    -d '{"username":"hey","password":"123"}'\
    -v

