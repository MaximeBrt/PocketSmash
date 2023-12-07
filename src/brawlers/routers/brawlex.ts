import { Client } from "pg";

export const add_brawler = async (brawler_json: any): Promise<any> => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  const name = brawler_json["name"];
  const id_chakra = brawler_json["id_chakra"];
  const hp = brawler_json["hp"];
  const power = brawler_json["power"];
  const speed = brawler_json["speed"];
  const price = brawler_json["price"];
  try {
    const response = await client.query(
      "INSERT INTO Brawlex (name, id_chakra, hp, power, speed, price) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, id_chakra, hp, power, speed, price]
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
