import mongoose from 'mongoose'

const connectDatabase=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb connected successfully")
       
    } catch (error) {
       console.error("Error connecting to MongoDB:", error.message);
    
        
    }
}
export default connectDatabase