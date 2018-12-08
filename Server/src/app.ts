import { GraphQLServer } from "graphql-yoga";
import Schema from "./data/schema/schema";
import Query from "./data/resolvers/query";
import Mutation from "./data/resolvers/mutation";
import helmet from "helmet";
import compression from "compression";
import mongoose from "mongoose";
import configs from "./configs/configs";
import User from "./models/User";

mongoose.connect(
  configs.url,
  configs.options,
  err => {
    if (err) return console.log("Failed to connect to Database!");
    console.log("DB connected!");
  }
);

const resolvers: any = {
  Query,
  Mutation
};

const server = new GraphQLServer({
  typeDefs: Schema,
  resolvers,
  context: {
    User
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});

server.express.use(helmet());
server.express.use(compression());

const options = {
  port: 8080,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
  formatError(err: any): any {
    return err.message;
  },
  debug: false
};

server.start(options, () => {
  console.log("server started!");
});
