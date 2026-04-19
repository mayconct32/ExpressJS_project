import { mongodb_connection } from "../db_connection.js"
import { app } from "./app.js"
import { server_http } from "./socket_io.js"


mongodb_connection()

// app.listen(
//     8081,
//     () => {
//         console.log(`The server is running on port 8081...`)
//     }
// )

server_http.listen(
    3000, 
    () => {
        console.log("Server is running on PORT 3000")
    }
)

