import mongoose from "mongoose"


export async function mongodb_connection(uri){
    await mongoose.connect(uri)
}

