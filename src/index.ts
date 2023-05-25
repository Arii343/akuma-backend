import "./loadEnviroment.js";
import app from "./server/index.js";
import createDebug from "debug";
import chalk from "chalk";
import connectDataBase from "./database/connectDataBase.js";

const port = process.env.PORT ?? 4000;
const debug = createDebug("api-akuma:root");
const mongoDbUrl = process.env.MONGODB_CONNECTION;

if (!mongoDbUrl) {
  debug(chalk.red("Missing environment variables"));
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.blue("Server live on:"), chalk.green(`http://localhost:${port}`));
});

try {
  await connectDataBase(mongoDbUrl);
  debug(chalk.green("Succesfully connected to database"));
} catch (error: unknown) {
  debug(chalk.red(`Error connecting to database: ${(error as Error).message}`));
}
