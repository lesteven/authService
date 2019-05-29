#!/bin/bash


curl -X DELETE localhost:3000/api/sessions/foo\
    -b cookie-file.txt \
    -H 'Content-Type: application/json'\
    -v

