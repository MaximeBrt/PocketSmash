import { Client } from "pg";

export const add_chakra = async (chakra_json: any): Promise<any> => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  const name = chakra_json["name"];
  try {
    const response = await client.query(
      "INSERT INTO Chakra (name) VALUES ($1)",
      [name]
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
