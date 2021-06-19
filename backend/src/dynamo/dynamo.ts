/**
 *  DynamoDB Object used to connect to DynamoDB
 *
 */

import AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-1',
  endpoint: 'http://dynamodb.us-west-1.amazonaws.com',
  apiVersion: 'latest',
});

export default dynamo;
