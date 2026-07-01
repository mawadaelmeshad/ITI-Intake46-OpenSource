const express           = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML }      = require("ruru/server");

const { schema: schema1, rootValue } = require("./schema1");

const schema2 = require("./schema2");

const app  = express();
const PORT = 4000;

app.use(express.json());

app.all("/graphql1", createHandler({
  schema:    schema1,
  rootValue: rootValue,   
  formatError(error) {
    console.error("[GraphQL1 Error]", error.message);
    return { message: error.message, extensions: { timestamp: new Date().toISOString() } };
  },
}));

const approach2Handler = createHandler({
  schema: schema2,
  formatError(error) {
    console.error("[GraphQL2 Error]", error.message);
    return { message: error.message, extensions: { timestamp: new Date().toISOString() } };
  },
});
app.all("/graphql",  approach2Handler);
app.all("/graphql2", approach2Handler);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.use((err, req, res, next) => {
  console.error("[Express Error]", err.stack);
  res.status(500).json({ error: { message: err.message } });
});

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
  console.log(`Approach 1 (SDL)          → http://localhost:${PORT}/graphql1`);
  console.log(`Approach 2 (Programmatic) → http://localhost:${PORT}/graphql2`);
  console.log(`GraphiQL Playground       → http://localhost:${PORT}/`);
});
