import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import { uid } from "uid";

const dbFile = resolve("src", "db", "products.json");

const readDbFile = async function () {
  try {
    const data = await fs.readFile(dbFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const writeDbFile = async function (data) {
  try {
    await fs.writeFile(dbFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
};

export const addProduct = async function ({ name, price }) {
  const id = uid();
  const product = {
    id,
    name,
    price: parseFloat(price),
    discount: 0,
  };
  const productsArray = await readDbFile();
  productsArray.push(product);
  await writeDbFile(productsArray);
  return product;
};
