import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const initDB = async () => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  try {
    const res_round = await client.query(roundInit);
    const res_match = await client.query(matchInit);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};

const roundInit = `
CREATE TABLE IF NOT EXISTS round (
  id SERIAL PRIMARY KEY,
  number INT,
  id_brawler_1 SERIAL,
  id_brawler_2 SERIAL,
  id_winner SERIAL
  )
  `;

const matchInit = `
    CREATE TABLE IF NOT EXISTS match (
      id SERIAL PRIMARY KEY,
      id_player_1 SERIAL,
      id_player_2 SERIAL,
      creation_date TIMESTAMP,
      start_date TIMESTAMP,
      end_date TIMESTAMP,
      status VARCHAR(10) CHECK (status IN ('Created', 'On Going', 'Finish')) DEFAULT 'Created',
      id_winner SERIAL,
      id_round SERIAL,
      invitation_status VARCHAR(100),
      id_invited SERIAL,
      FOREIGN KEY (id_round) REFERENCES round(id)
    )
  `;
