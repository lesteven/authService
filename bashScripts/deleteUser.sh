#!/bin/bash


curl -X DELETE localhost:3000/api/sessions/hey\
    -b cookie-file.txt \
    -H 'Content-Type: application/json'\
    -v

