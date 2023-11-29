import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { initDB } from "../db/initDb";

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

  server.listen(3000, () => {
    console.log("Server on port 3000");
  });
};

// InitDB
initDB();

// Start server
StartServer();
