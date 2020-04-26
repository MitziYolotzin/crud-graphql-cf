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
        updateCourse(id: ID!, title: String!, views: Int): Course
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

    },
    updateCourse({ id, title, views }) {
        //send function, execute for each element in array, send element as argument 
        //return true, position, when they are the same id, receive the item´s position to update 
        const courseIndex = courses.findIndex((course) => id === course.id);
        const course = courses[courseIndex];
        //save in a new variable, and construct new obj with value of element, and additional values they modify
        const newCourse = Object.assign(course, { title, views });
        course[courseIndex] = newCourse;

        return newCourse;
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