const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require("./config/connection");
//const routes = require('./routes');
const typeDefs = require("./schema");
const resolvers = require("./schema");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

//app.use(routes);

db.once("open", () => {
  app.listen(PORT, () =>
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  );
});
