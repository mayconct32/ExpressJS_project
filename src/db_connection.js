import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config({path: "../.env"})

export async function mongodb_connection(){
    await mongoose.connect(
        process.env.DATABASE_URL
    )
}

