import { Client } from "pg";

export const initDB = async () => {
  const client = new Client(
    "postgres://pnfujgae:Qh9c3m5hegA5Z-QGMiIkv3X5376cWQxF@surus.db.elephantsql.com/pnfujgae"
  );
  await client.connect();
  try {
    const res = await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100),
      status VARCHAR(10) CHECK (status IN ('Online', 'Offline', 'In Match'))
    )
  `);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};
