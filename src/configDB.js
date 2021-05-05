'use strict'

require('dotenv').config().parsed
const express = require('express')
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Doduong:<password>@cluster0.naknr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});