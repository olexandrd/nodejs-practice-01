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

export const deleteProduct = async (id) => {
  const productsArray = await readDbFile();
  const productIdx = productsArray.findIndex((product) => product.id === id);
  if (productIdx === -1) {
    return null;
  }
  const [removedProduct] = productsArray.splice(productIdx, 1);
  await writeDbFile(productsArray);

  return removedProduct;
};

export const updateProduct = async (id, { name, price, discount }) => {
  const productsArray = await readDbFile();
  const productIdx = productsArray.findIndex((product) => product.id === id);
  if (productIdx === -1) {
    return null;
  }
  const productUpdate = { ...productsArray[productIdx] };
  if (name) productUpdate["name"] = name;
  if (price) productUpdate["price"] = parseFloat(price);
  if (discount) productUpdate["discount"] = parseFloat(discount);

  productsArray[productIdx] = productUpdate;
  await writeDbFile(productsArray);

  return productUpdate;
};
