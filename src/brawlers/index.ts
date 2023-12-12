import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { Client } from "pg";
import { fillDB, initDB } from "./db/initDb";
import { add_brawler } from "./routers/brawlex";
import { add_pocketbrawler, get_collection } from "./routers/pocketbrawler";

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

  // requête GET get_brawlex pour avoir tous les brawlers disponible dans le shop
  app.get("/brawlex", async (req, res) => {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    try {
      const response = await client.query("SELECT * FROM Brawlex");
      res.json(response.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error fetchig the Brawlex" });
    } finally {
      await client.end();
    }
  });

  // requête GET get_brawlex_by_id pour avoir un brawler avec son id
  app.get("/brawlex/:id", async (req, res) => {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    try {
      const params = req.params as any;
      const brawler_id = params["id"];
      const response = await client.query(
        "SELECT * FROM Brawlex WHERE id = $1",
        [brawler_id]
      );
      res.json(response.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error fetchig the Brawlex" });
    } finally {
      await client.end();
    }
  });

  // requête POST add_user pour créer un user
  app.post("/pocket", async (req, res) => {
    const body = req.body as any;
    const response = await add_pocketbrawler(body);
    res.json(response.rows);
  });

  // requête GET get_colection pour avoir la collection d'un user
  app.get("/pocket/:id_user", async (req, res) => {
    const params = req.params as any;
    const response = await get_collection(params["id_user"]);
    res.json(response.rows);
  });

  const server = http.createServer(app);

  server.listen(3002, () => {
    console.log("Brawler Server on port 3002");
  });
};

// InitDB
initDB();
// If the fixed table need to be filled : uncomment this line
// fillDB();

// Start server
StartServer();
