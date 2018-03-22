'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: req.params.id,
    },
  };
  dynamoDb.delete(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not delete todos' });
    }
    res.json({});
  });
}
