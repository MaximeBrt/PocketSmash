import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { Client } from "pg";
import { initDB } from "./initDb";
import { buy_brawler, get_collection } from "./routers/pocketbrawler";

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

  // requête GET get_users pour avoir tous les users
  app.get("/users", async (req, res) => {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    try {
      const response = await client.query("SELECT * FROM users");
      res.json(response.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error fetchig users" });
    } finally {
      await client.end();
    }
  });

  // requête POST add_user pour créer un user
  app.post("/users", async (req, res) => {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    const body = req.body as any;
    const username = body["username"];
    const email = body["email"];
    const hashedPassword = await bcrypt.hash(body["password"], 10);
    try {
      const response = await client.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
        [username, email, hashedPassword]
      );
      res.json(response.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error creating user" });
    } finally {
      await client.end();
    }
  });

  // requête GET get_user_by_id pour avoir un user avec son id
  app.get("/users/:id", async (req, res) => {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    const params = req.params as any;
    const user_id = params["id"];
    try {
      const response = await client.query("SELECT * FROM users WHERE id = $1", [
        user_id,
      ]);
      res.json(response.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error creating user" });
    } finally {
      await client.end();
    }
  });

  // requête PUT update_user pour modifier un user avec son id
  app.put("/users/:id", async (req, res) => {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    const params = req.params as any;
    console.log(params);
    console.log(req.body);
    const body = req.body as any;
    console.log(body);
    const user_id = params["id"];
    const username = body["username"];
    const email = body["email"];
    const status = body["status"];
    const clearance = body["clearance"];
    const credits = body["credits"];
    const badges = body["badges"];
    try {
      console.log(username);
      const response = await client.query(
        "UPDATE users SET username = $1, email = $2, status = $3, clearance = $4, credits = $5, badges = $6 WHERE id = $7 ",
        [username, email, status, clearance, credits, badges, user_id]
      );
      res.json(response.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error creating user" });
    } finally {
      await client.end();
    }
  });

  // requête DEL delete_user_by_id pour supprimer un user avec son id
  app.delete("/users/:id", async (req, res) => {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();
    const params = req.params as any;
    const user_id = params["id"];
    try {
      const response = await client.query("DELETE FROM users WHERE id = $1", [
        user_id,
      ]);
      res.json(response.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error deleting user" + user_id });
    } finally {
      await client.end();
    }
  });

  app.post("/pocket", async (req, res) => {
    try {
      const body = req.body as any;
      const response = await buy_brawler(body);
      res.json(response.rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error buying a brawler" });
    }
  });

  app.get("/pocket/:user_id", async (req, res) => {
    try {
      const params = req.params as any;
      const response = await get_collection(params["user_id"]);
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting the collection" });
    }
  });

  const server = http.createServer(app);

  server.listen(3000, () => {
    console.log("Server on port 3000");
  });
};

// InitDB
initDB();

// Start server
StartServer();
