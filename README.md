# simple-node-CRUD
Simple node API with basic CRUD operations.

# Technologies
- Node
- Sequelize
- Postgres

## Commands

`npm install` install the required node modules

`npm run dev` run in developer mode which restarts the server automatically on save.

# Endpoints


  | URL                              | Methods | Description            |
  |----------------------------------|---------|------------------------|
  | /                                | GET     | Welcome message        |
  | /api/contacts                    | POST    | registering a user     |
  | /api/contacts                    | GET     | Get all contacts       |
  | /api/contacts/:id                | GET     | Get one contact        |
  | /api/contacts/:id                | PUT     | Update contact         |
  | /api/contacts/:id                | DELETE  | Delete contact         |
