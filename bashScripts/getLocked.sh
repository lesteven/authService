#!/bin/bash

curl localhost:3000/locked/test \
    -b cookie-file.txt \
    -v
    
