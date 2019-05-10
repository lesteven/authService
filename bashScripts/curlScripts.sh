#!/bin/bash

# go to script dir
cd "$(dirname "$0")"

line="==========================================="

# test get request
curl localhost:3000/api/cookies -v
echo $line

# test get cookie and save to file
curl localhost:3000/api/cookies 2>&1 -c cookies.txt -v 

echo cookie
# send request w/ cookie
curl localhost:3000/api/cookies -b cookies.txt -v
echo $line

# test w/ 2 more tries for comparison
second=$(curl localhost:3000/api/cookies 2>&1 -b cookies.txt -v \
    | grep Cookie)

third=$(curl localhost:3000/api/cookies 2>&1 -b cookies.txt -v \
    | grep Cookie)

if [ "$second" == "$third" ]; then
    echo "The same cookie was sent"
else
    echo "Different cookies were sent"
fi

