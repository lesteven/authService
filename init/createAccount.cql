
DROP TABLE IF EXISTS users.accounts;

CREATE TABLE users.accounts (
    id uuid,
    username text,
    password text,
    created_at timestamp, 
    PRIMARY KEY(username, id)
);
