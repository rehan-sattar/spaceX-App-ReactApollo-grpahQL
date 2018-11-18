const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log(`Server running on port : ${PORT}`);
});
