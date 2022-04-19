const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {expected} = chai;
const server = require('../api/app')

const { getConnection } = require('./connectionMock') 
const { MongoClient } = require('mongodb')

const jwt = require('jsonwebtoken')

let connectionMock;

before( async () => {
  connectionMock = await getConnection();
  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  
})

after( () => {
  MongoClient.connect.restore();
})

describe('', () => {
});
