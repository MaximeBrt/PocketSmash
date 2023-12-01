import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const initDB = async () => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  try {
    const res_users = await client.query(usersInit);
    const res_friends = await client.query(friendsInit);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};

const usersInit = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    status VARCHAR(10) CHECK (status IN ('Online', 'Offline', 'In Match')) DEFAULT 'Offline',
    clearance INT DEFAULT 1,
    credits INT DEFAULT 0,
    badges INT DEFAULT 0
  )
`;

const friendsInit = `
  CREATE TABLE IF NOT EXISTS friends (
    id SERIAL PRIMARY KEY,
    id_user_1 SERIAL,
    id_user_2 SERIAL,
    FOREIGN KEY (id_user_1) REFERENCES users(id),
    FOREIGN KEY (id_user_2) REFERENCES users(id)
  )
`;

const pocketBrawlerInit = `
  CREATE TABLE IF NOT EXISTS pocketbrawlers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100),
    status VARCHAR(10) CHECK (status IN ('Online', 'Offline', 'In Match'))
  )
`;
