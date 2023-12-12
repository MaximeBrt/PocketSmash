import { Client } from "pg";

export const add_pocketbrawler = async (
  pocketbrawler_json: any
): Promise<any> => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  const id_brawlex = pocketbrawler_json["id_brawlex"];
  const id_user = pocketbrawler_json["id_user"];
  try {
    const response = await client.query(
      "INSERT INTO pocketbrawlers (id_brawlex, id_user) VALUES ($1, $2)",
      [id_brawlex, id_user]
    );
    return new Promise((resolve) => {
      resolve(response);
    });
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};

export const get_collection = async (id_user: number): Promise<any> => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  try {
    const response = await client.query(
      "SELECT * FROM Brawlex JOIN pocketbrawlers ON Brawlex.id = id_brawlex WHERE id_user = $1",
      [id_user]
    );
    return new Promise((resolve) => {
      resolve(response);
    });
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};
