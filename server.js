const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const app = express();
const cors = require("cors");
const path = require('path');
// alowing cross origin access
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use(express.static('public'));

app.get("*", (req, res) => {
  res.sendFile(__dirname, 'public', 'index.html');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
