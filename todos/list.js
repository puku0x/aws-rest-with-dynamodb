'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };
  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not fetch todos' });
    }
    res.json(result.Items);
  });
}
