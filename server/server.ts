import { makeSchema } from "nexus";
import { ApolloServer } from "apollo-server-express";
import { join } from "path";
import * as ticket from "./api/ticket";
const express = require("express");


const schema = makeSchema({
  types: ticket,
  outputs: {
    schema: join(process.cwd(), "api/generated/ticket.gql"),
    typegen: join(process.cwd(), "api/generated/ticket.ts"),
  },
});

async function startApollo() {
  const server = new ApolloServer({ schema });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: 4000 }, r));
  console.log(`http://localhost:4000${server.graphqlPath}`);
}

startApollo();
