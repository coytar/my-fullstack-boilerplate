import "dotenv/config";
import http from "http";
import cors from "cors";

import path from "path";
import bodyParser from "body-parser";
import express from "express";

import { configPassport } from "./passport/config.js";
import routes from "./routes/index.js";

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

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(
    `🚀 ${process.env.NODE_ENV} server is listening on http://${
      process.env.HOST
    }:${[process.env.PORT]}`
  )
);
