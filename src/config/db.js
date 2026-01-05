import mongoose from "mongoose";

const connectDB = async () => {
   try {
    const conn = await mongoose.connect(process.env.DATABASE_URI)
    console.log(`database connected successfully ${conn.connection.host}` )
   } catch (error) {
      console.error( `error:${error.message}`);
      process.exit(1)
    
   }
}

export default connectDB;