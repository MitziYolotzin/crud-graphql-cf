const express = require('express');
const { buildSchema } = require('graphql');

const app = express();

const schema = buildSchema(`
    type Course{
        id: ID
        title: String
        views: Int
    }
`)

app.get('/', function(req, res) {
    res.send("Hello");
});

app.listen(8080, function() {
    console.log("Server on");
});