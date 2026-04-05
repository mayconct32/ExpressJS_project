import { mongodb_connection } from "../db_connection.js"
import { app } from "./app.js"


const port = 8081

mongodb_connection()

app.listen(
    port,
    () => {
        console.log(`The server is running on port ${port}...`)
    }
)