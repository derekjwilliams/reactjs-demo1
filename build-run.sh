#!/bin/bash

# Start from scratch assuming we already have postgres server and psql already installed:
dropdb -U postgres "periodic_table"
createdb -U postgres "periodic_table"
psql -d "postgres://postgres:postgres@localhost/periodic_table" -f periodic_table.sql

npm install
npm install --save-dev web-vitals
npm start
