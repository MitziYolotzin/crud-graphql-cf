const express = require('express');
const { buildSchema } = require('graphql');

const courses = require('./courses');

const app = express();

const schema = buildSchema(`
    type Course{
        id: ID!
        title: String!
        views: Int
    }

    type Query{
        getCourses: [Course]

    }
`);
//type Query, declarar todas las consultas que podemos hacer al serv de graphql


app.get('/', function(req, res) {
    res.send("Hello");
});

app.listen(8080, function() {
    console.log("Server on");
});