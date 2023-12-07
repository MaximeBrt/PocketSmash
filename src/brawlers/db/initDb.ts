import { Client } from "pg";
import dotenv from "dotenv";
import { brawlex } from "./brawlex";
import { chakra } from "./chakra";
import { add_brawler } from "../routers/brawlex";
import { add_chakra } from "../routers/chakra";

dotenv.config();

export const initDB = async () => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  try {
    const res_Chakra = await client.query(ChakraInit);
    // const res_Effectiveness = await client.query(EffectivenessInit);
    const res_Brawlex = await client.query(BrawlexInit);
    // const res_pocketbrawlers = await client.query(pocketbrawlersInit);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};

export const fillDB = async () => {
  for await (let chakra_json of chakra) {
    try {
      await add_chakra(chakra_json);
    } catch (err) {
      console.log(err);
    }
  }
  console.log("Chakra added to the database");
  for await (let brawler_json of brawlex) {
    try {
      await add_brawler(brawler_json);
    } catch (err) {
      console.log(err);
    }
  }
  console.log("Brawlers added to the brawlex");
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
    speed INT,
    price INT,
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
