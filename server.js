'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');
require('dotenv').config();


const app = express();
const env = process.env

// db config
const sequelize = new Sequelize(env.PGDATABASE, 'tittoh', env.PGPASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Model

const Contact = sequelize.define('contact', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: Sequelize.STRING,
  website: Sequelize.STRING
});

// force: true will drop the table if it already exists
Contact.sync()
  .then(() => {
    // Table created
    console.log('Table created');
});

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

// GET: Home
app.get('/', (request, response) => {
  response.json('Welcome! This is the very beginning of nothingness. Cheers')
});

// GET: Get all contacts
app.get('/api/contacts/', (request, response) => {
  Contact
    .findAll()
    .then(contacts => {
      response.json(contacts);
    })
});

// GET: Get one contact with id
app.get('/api/contacts/:id', (request, response) => {
  const requestId = request.params.id;

  Contact
    .findOne({ where: {id: requestId} })
    .then(contact => {
      if (!contact) {
        response.json({ message: 'Contact not found'})
      }
      response.json(contact);
    })
});

// POST: add a new contact
app.post('/api/contacts/', (request, response) => {
  const data = {
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    website: request.body.website
  };
  Contact
    .create(data)
    .then(contact => {
      response.status(201).json(contact);
    })
});

// PUT: Update a contact
app.put('/api/contacts/:id', (request, response) => {
  const requestId = request.params.id;
  const data = request.body

  Contact
    .findOne({ where: { id: requestId } })
    .then(contact => {
      if (!contact) {
        return response.json({ message: 'Contact not found' })
      }
      return contact
        .update(data)
        .then(
          response.json(contact)
        );
    });
});

// DELETE: Delete a contact
app.delete('/api/contacts/:id', (request, response) => {
  const requestId = request.params.id;

  Contact
    .findByPk(requestId)
    .then(contact => {
      if (!contact) {
        return response.json({ message: 'Contact not found' })
      }
      return contact
        .destroy()
        .then(
          response.json({ message: `Contact ${requestId} deleted` })
        )
    });
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is running at http://${env.HOST}:${env.PORT}`)
});
