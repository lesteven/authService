#!/bin/bash


curl localhost:3000/api/sessions \
    -c cookie-file.txt \
    -H 'Content-Type: application/json' \
    -d '{"username":"hey","password":"123"}' \
    -v

