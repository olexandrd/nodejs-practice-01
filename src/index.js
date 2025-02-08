import { program } from "commander";
import { addProduct } from "./actions.js";

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
      const product = await addProduct({ name, price });
      console.table(product);
      break;
    default:
      console.log(options);
    // console.log("Unknown action");
  }
}

invokeAction(options);
