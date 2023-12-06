import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { Client } from "pg";
import { initDB } from "./initDb";

const bcrypt = require("bcrypt");

const StartServer = () => {
  const app = express();

  app.use(
    cors({
      credentials: true,
    })
  );

  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());

  const server = http.createServer(app);

  server.listen(3001, () => {
    console.log("Arena Server on port 3001");
  });
};

// InitDB
initDB();

// Start server
StartServer();
