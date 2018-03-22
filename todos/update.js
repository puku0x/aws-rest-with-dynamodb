'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res) => {
  const timestamp = new Date().getTime();
  const data = req.body;

  // validation
  if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
    console.error('Validation failed');
    res.status(400).json({ error: 'Could not update todo' });
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: req.params.id,
    },
    ExpressionAttributeNames: {
      '#todo_text': 'text',
    },
    ExpressionAttributeValues: {
      ':text': data.text,
      ':checked': data.checked,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };
  dynamoDb.update(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not delete todo' });
    }
    res.json(result.Attributes);
  });
}
