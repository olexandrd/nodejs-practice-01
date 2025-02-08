import { program } from "commander";
import Joi from "joi";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  filterProductsByName
} from "./actions.js";

program
  .option("--action, -a <action>", "Action")
  .option("--id, -i <id>", "Id")
  .option("--name, -n <name>", "Name")
  .option("--price, -p <price>", "Price")
  .option("--discount, -d <discount>", "Discount")
  .parse(process.argv);

const options = program.opts();

const addProductSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().min(0).max(1000000).required(),
});

async function invokeAction({ action, id, name, price, discount, query }) {
  switch (action) {
    case "add":
      const {error} = addProductSchema.validate({ name, price })
      if(error) {
        console.error(error.message);
        break
      }
      const addedProduct = await addProduct({ name, price });
      console.table(addedProduct);
      break;
    case "remove":
      const removedProduct = await deleteProduct(id);
      console.table(removedProduct);
      break;
    case "filter":
      const searchResult = await filterProductsByName({name, discount});
      console.table(searchResult);
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
