const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const courses = require('./courses');

const app = express();

//schema definition language
const schema = buildSchema(`
    type Course {
        id: ID!
        title: String!
        views: Int
    }

    type Query {
        getCourses: [Course]
        getCourse(id: ID!): Course

    }

    type Mutation {
        addCourse(title: String!, views: Int): Course
    }
`);
//type Query, all the queries we can make are declared to server in graphql

//obj with functions, queries indicating that it returns
const root = {
    getCourses() {
        return courses;
    },
    getCourse({ id }) {
        console.log(id);
        //when function return true, return value, when match find id
        return courses.find((course) => id == course.id);
    },
    addCourse({ title, views }) {
        const id = String(courses.length + 1);
        const course = { id, title, views };
        courses.push(course);
        return course;

    }
}

app.get('/', function(req, res) {
    res.json(courses);
});

//middleware
//serv on the server
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root, //works as initial value to res, of any query(consulta) in graphql
    graphiql: true
}));


app.listen(8080, function() {
    console.log("Server on");
});