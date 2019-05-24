#!/bin/bash


curl localhost:3000/api/users\
    -H 'Content-Type: application/json'\
    -d '{"username":"helloExists","password":"123"}'\
    -v

