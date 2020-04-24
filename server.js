const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const courses = require('./courses');

const app = express();

//schema definition language
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
//type Query, all the queries we can make are declared to server in graphql

//obj with functions, queries indicating that it returns
const root = {
    getCourses() {
        return courses;
    }
}

app.get('/', function(req, res) {
    res.send("Hello");
});

//middleware
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root, //works as initial value to res, of any query(consulta) in graphql
    graphiql: true
}));


app.listen(8080, function() {
    console.log("Server on");
});