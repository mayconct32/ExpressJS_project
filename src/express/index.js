import { mongodb_connection } from "../db_connection.js"
import { server_http } from "./socket_io.js"
import dotenv from "dotenv"


async function start_server() {
  try {
    dotenv.config({path: [".env","../.env"]})
    await mongodb_connection(process.env.DATABASE_URL);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
  try {
    server_http.listen(3000, () => {
      console.log("Server is running on PORT 3000");
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

start_server()

