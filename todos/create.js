'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res) => {
  const timestamp = new Date().getTime();
  const data = req.body;

    // validation
    if (typeof data.text !== 'string') {
      console.error('Validation failed');
      res.status(400).json({ error: 'Could not create todo' });
    }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      text: data.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create todo' });
    }
    res.json(params.Item);
  });
}
