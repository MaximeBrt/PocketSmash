import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const initDB = async () => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  try {
    const res_Chakra = await client.query(ChakraInit);
    const res_Effectiveness = await client.query(EffectivenessInit);
    const res_Brawlex = await client.query(BrawlexInit);
    const res_pocketbrawlers = await client.query(pocketbrawlersInit);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};

const ChakraInit = `
  CREATE TABLE IF NOT EXISTS Chakra (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
  )
`;

const EffectivenessInit = `
  CREATE TABLE IF NOT EXISTS Effectiveness (
    id SERIAL PRIMARY KEY,
    id_chakra_atk SERIAL,
    id_chakra_def SERIAL,
    FOREIGN KEY (id_chakra_atk) REFERENCES Chakra(id),
    FOREIGN KEY (id_chakra_def) REFERENCES Chakra(id)
  )
`;

const BrawlexInit = `
  CREATE TABLE IF NOT EXISTS Brawlex (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    id_chakra SERIAL,
    hp INT,
    power INT,
    Speed INT,
    FOREIGN KEY (id_chakra) REFERENCES Chakra(id)
  )
`;

const pocketbrawlersInit = `
  CREATE TABLE IF NOT EXISTS pocketbrawlers (
    id SERIAL PRIMARY KEY,
    id_brawlex SERIAL,
    id_user SERIAL,
    xp INT,
    level INT,
    FOREIGN KEY (id_brawlex) REFERENCES Brawlex(id)
  )
`;
