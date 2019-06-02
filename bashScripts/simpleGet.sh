#!/bin/bash


curl localhost:3000/api/users \
    -b cookie-file.txt \
    -v

