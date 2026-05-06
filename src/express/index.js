import { mongodb_connection } from "../db_connection.js"
import { server_http } from "./socket_io.js"
import dotenv from "dotenv"


async function start_server() {
  try {
    dotenv.config({ path: [".env", "../.env"] });

    await Promise.race([
      mongodb_connection(process.env.DATABASE_URL),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(
          "Timeout occurred while connecting to MongoDB"
        )), 4000)
      )
    ]);

  } catch (error) {
    console.error("Failed to connect to MongoDB", error.message);
    process.exit(1);
  }

  try {
    const PORT = process.env.PORT || 3000
    server_http.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

start_server()

