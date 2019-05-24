
An authentication microservice.

Created with Express, Passport.js and Cassandra.

Used Express for easy integration with Universal React, serving as
a user authentication for API gateway.

Cassandra used for user account storage and user sessions. Cassandra 
saves data in memtable before flushing to SSTables. If data is in
memtable, it will be served faster because you will not have to touch
disk.

Paths:

api/users

api/sessions
