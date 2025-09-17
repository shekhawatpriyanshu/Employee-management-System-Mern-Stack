import multer from "multer";
import User from "../models/UserModel.js";
import Department from "../models/Department.js";
import path from 'path'
import bcrypt from 'bcrypt'
import Employee from "../models/Employee.js";
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname))
    }
})
 export const upload=multer({storage:storage})
export const addEmployee=async(req,res)=>{
    try{

        const{
            name,
            email,
            employeeId,
            dob,
            gender,
            maritialStatus,
            designation,
            department,
            salary,
            password,
            role
            
        }=req.body;
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                error:'user already registered in emp' 
            })
            
        }
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            name,
            email,
            password:hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        })
        

        const savedUser= await newUser.save()
        const newEmployee=new Employee({
            userId:savedUser._id,
            
            employeeId,
            dob,
            gender,
            maritialStatus,
            designation,
            department,
            salary
            
        })
        await newEmployee.save()
        return res.status(200).json({
            success:true,message:'employee created'
        })
    }
    catch(error){
        console.log(error.message)
return res.status(500).json({
    success:false,
    error:"server error in adding employee"
})
    }
}
 export const getEmployees=async(req,res)=>{
     try {
       const employees = await Employee.find().populate('userId',{password:0}).populate('department');
       return res.status(200).json({
         success: true,
         employees,
       });
     } catch (error) {
       res.status(500).json({
         success: false,
         error: "get employees server erropr",
       });
     }
 }
 export const getEmployee = async (req, res) => {
   const { id } = req.params;
   try {
     let employee;

     
     employee = await Employee.findById(id)
       .populate("userId", { password: 0 })
       .populate("department");

     
     if (!employee) {
       employee = await Employee.findOne({ userId: id })
         .populate("userId", { password: 0 })
         .populate("department");
     }

     if (!employee) {
       return res.status(404).json({
         success: false,
         error: "Employee not found",
       });
     }

     
     return res.status(200).json({
       success: true,
       employee,
     });
   } catch (error) {
     res.status(500).json({
       success: false,
       error: "get employees server error",
     });
   }
 };

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            
            maritialStatus,
            designation,
            department,
            salary,
            
        } = req.body;

       

       const employee=await Employee.findById({_id:id})
       if(!employee){
        return res.status(404).json({
            success:false,
            error:"employee not found"
        })
       }
       const user=await User.findById({_id:employee.userId})
       if(!user){
        return res.status(404).json({
            sucess:false,
            error:"user not found"
        })
       }
       const updateUser=await User.findByIdAndUpdate({_id:employee.userId},{name})
       const updateEmployee=await Employee.findByIdAndUpdate({_id:id},{
        maritialStatus,
        designation,salary,department
       })
       if(!updateEmployee || !updateUser){
        return res.status(404).json({
            success:false,
            error:"doc not found"
        })
       }
       return res.status(200).json({
        success:true,
        message:"employee updated"
       })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "update employees server error",
        });
    }
}
export const fetchEmployeesByDepId=async(req,res)=>{
  
      const { id } = req.params;
      try {
        const employees = await Employee.find({department: id })
         
        return res.status(200).json({
          success: true,
          employees,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: "get employees server error",
        });
      
    };
}