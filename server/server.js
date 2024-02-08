import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import { typeDefs, resolvers } from "./schema/index.js";
import { configPassport } from "./passport/config.js";
import routes from "./routes/index.js";
import { requireAuth } from "./routes/middleware.js";
import { GraphQLError } from "graphql";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";

const app = express();

// if (process.env.NODE_ENV == "development") {
//   console.log("Enabling CORS");
//   const whitelist = [
//     "http://localhost:3000",
//     "http://localhost:3001",
//     "http://192.168.99.3:3000",
//     "https://template1.endratek.com",
//   ];
//   const corsOptions = {
//     credentials: true, // This is important.
//     origin: (origin, callback) => {
//       console.log("Requesting from", origin);
//       if (whitelist.includes(origin)) return callback(null, true);

//       callback(new Error("Not allowed by CORS"));
//     },
//   };
//   app.use(cors(corsOptions));
//   // app.use(cors());
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

configPassport(app, express);
app.use("/", routes);

const httpServer = http.createServer(app);

const server = new ApolloServer({
  // introspection: false,
  // landing: false,
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // ApolloServerPluginLandingPageDisabled(),
    {
      async serverWillStart() {
        return {
          async renderLandingPage() {
            const html = `
            <!DOCTYPE html>
            <html>
              <head>
              </head>
              <body>
              User not authenticated
              </body>
            </html>`;
            return { html };
          },
        };
      },
    },
  ],
});
await server.start();

app.use(
  "/graphql",
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    // context: async ({ req }) => {
    //   if (!req.user)
    //     // throwing a `GraphQLError` here allows us to specify an HTTP status code,
    //     // standard `Error`s will have a 500 status code by default
    //     throw new GraphQLError("User is not authenticated", {
    //       extensions: {
    //         code: "UNAUTHENTICATED",
    //         http: { status: 401 },
    //       },
    //     });
    //   // add the user to the context
    //   return { user };
    // },
    // context: async ({ req, res }) => {
    //   if (!req.user) {
    //     res.status(401).send({ message: "User not authenticated" });
    //   }
    //   return { req, res };
    // }
  })
);

await new Promise((resolve) =>
  httpServer.listen(process.env.PORT, process.env.HOST, resolve)
);
console.log(
  `🚀 Server ready at http://${process.env.HOST}:${[process.env.PORT]}`
);

// app.listen(process.env.PORT, process.env.HOST, () =>
//   console.log(
//     `🚀 ${process.env.NODE_ENV} server is listening on http://${
//       process.env.HOST
//     }:${[process.env.PORT]}`
//   )
// );
