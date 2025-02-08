import { program } from "commander";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./actions.js";

program
  .option("--action, -a <action>", "Action")
  .option("--id, -i <id>", "Id")
  .option("--name, -n <name>", "Name")
  .option("--price, -p <price>", "Price")
  .option("--discount, -d <discount>", "Discount")
  .parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, price, discount }) {
  switch (action) {
    case "add":
      const addedProduct = await addProduct({ name, price });
      console.table(addedProduct);
      break;
    case "remove":
      const removedProduct = await deleteProduct(id);
      console.table(removedProduct);
      break;
    case "update":
      const updatedProduct = await updateProduct(id, {
        name,
        price: price && parseFloat(price),
        discount: discount && parseFloat(discount),
      });
      console.table(updatedProduct);
      break;
    case "getAll":
      const allProducts = await getAllProducts();
      console.table(allProducts);
      break;
    default:
      console.log(options);
      console.error("\u001B[31mUnknown action");
  }
}

invokeAction(options);
