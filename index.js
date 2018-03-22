'use strict';

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express')
const app = express();

// App setting
app.use(cors());
app.use(bodyParser.json({ strict: false }));

// API
app.get('/v1/todos', require('./todos/list'));
app.get('/v1/todos/:id', require('./todos/get'));
app.post('/v1/todos', require('./todos/create'));
app.put('/v1/todos/:id', require('./todos/update'));
app.delete('/v1/todos/:id', require('./todos/delete'));

module.exports.handler = serverless(app);
