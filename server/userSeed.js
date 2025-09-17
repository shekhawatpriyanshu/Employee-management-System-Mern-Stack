import User from "./models/UserModel.js"
import bcrypt from 'bcrypt'
import connectDatabase from "./config/db.js"

const userRegister=async()=>{
    connectDatabase()
    try {
        const hashPassword=await bcrypt.hash('admin',10)
        const newUser=new User({
            name:'Admin',
            email:'admin@gmail.com',
            password:hashPassword,
            role:'admin',

        })
        await newUser.save()
    } catch (error) {
        console.log(error)
        
    }
}
userRegister()