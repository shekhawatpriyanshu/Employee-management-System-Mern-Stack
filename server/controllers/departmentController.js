import mongoose from 'mongoose'
import Department from "../models/Department.js";

export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    if (!dep_name) {
      return res
        .status(400)
        .json({ success: false, error: "Department name is required" });
    }

    const newDep = new Department({ dep_name, description });
    await newDep.save();

    return res.status(201).json({
      success: true,
      department: newDep,
    });
  } catch (error) {
    console.error("🔥 Add Department Error:", error); // <-- log full error
    return res.status(500).json({
      success: false,
      error: error.message || "Server error while adding department",
    });
  }
};

export const getDepartments=async(req,res)=>{
    try {
        const departments=await Department.find()
        return res.status(200).json({
success:true,
departments
        })
    } catch (error) {
        res.status(500).json({
success:false,
error:'get department server erropr'
        })
        
    }

}
export const getDepartment=async(req,res)=>{
    try {
        const {id}=req.params;
        const department=await Department.findById({_id:id})
        return res.status(200).json({
            success:true,
            department
        })
    } catch (error) {
       return res.status(500).json({
        success:false,
        error:"get department server error"
       }) 
    }
}
export const updateDepartment=async(req,res)=>{
    try {
        const {dep_name,description}=req.body;
        const {id}=req.params;
        const updateDep=await Department.findByIdAndUpdate({_id:id},{
            dep_name,
            description
        })
return res.status(200).json({
    success:true,
    updateDep
})
    } catch (error) {
        return res.status(500).json({
success:false,
error:'upadte dept error'
        })
    }
}
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid department ID" });
    }

    const deleteDep = await Department.findById(id);

    if (!deleteDep) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    await deleteDep.deleteOne(); // triggers pre('deleteOne') hook

    return res.status(200).json({
      success: true,
      message: "Department and related records deleted successfully",
      deleteDep,
    });
  } catch (error) {
    console.error("Delete dept error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error while deleting department",
    });
  }
};
