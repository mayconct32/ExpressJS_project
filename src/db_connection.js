import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config({path: [".env","../.env"]})

console.log(process.env.DATABASE_URL)
export async function mongodb_Connection(){
    await mongoose.connect(
        process.env.DATABASE_URL
    )
}

