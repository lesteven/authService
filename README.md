
An authentication microservice.

Created with Express, Passport.js and Cassandra.

Used Express for easy integration with Universal React, serving as
a user authentication for API gateway.

Cassandra used for user account storage and user sessions. Cassandra 
saves data in memtable before flushing to SSTables. If data is in
memtable, it will be served faster because you will not have to touch
disk. It is also highly availabe as each node in cassandra is 
independent and automatically replicated.

Reasons for using Cassandra over Redis
* cost, since Redis stores all data in memory, this leads to higher
cost
* perhaps it is more persistent
* replication factor allows you to make n copies to n different nodes
  * each node is indepedent; stores its own data

Reasons to choose Redis
* faster
* redis-cluster may be just as good for persistence 
  * master-slave architecture with sharding using hash slot method. 
  * eg. each shard has its own master-slave architecture)

Paths:

api/users

api/sessions


Custom RESTful passport strategy

