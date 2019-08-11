#!/bin/bash

cd "$(dirname "$0")/init"

cqlsh < createKeyspace.cql
cqlsh < createAccount.cql
cqlsh < createSessions.cql

cd ..

configFile="configFile.js"
if [ -f "$configFile" ]; then
    echo "$configFile already exists"
else
    echo "will create $configFile"
    cat <<EOF > "$configFile"
module.exports = {
    secret: 'replace_secret'
}
EOF
fi
