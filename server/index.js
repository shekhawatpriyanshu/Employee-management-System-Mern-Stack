import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import dotenv from 'dotenv'
import departmentRouter from'./routes/department.js'
import dashboardRouter from './routes/dashboard.js'
import employeeRouter from './routes/employee.js'
import connectDatabase from './config/db.js';
import attendanceRouter from './routes/attendance.js'
import salaryRouter from './routes/salary.js'
import settingRouter from './routes/setting.js'
import leaveRouter from'./routes/leave.js'
dotenv.config()
const port=process.env.PORT || 3000;
const app=express();
app.use(cors(
    {
    origin: "https://employee-management-system-mern-sta.vercel.app",
    credentials: true,
  }
))
app.use(express.json()) 
app.use(express.static('public/uploads'))
app.use('/api/auth',authRouter)
app.use('/api/department',departmentRouter)
app.use('/api/employee',employeeRouter)
app.use('/api/salary',salaryRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/setting',settingRouter)
app.use('/api/dashboard',dashboardRouter)
app.use('/api/attendance',attendanceRouter)
app.listen(port,()=>{
    connectDatabase();
    console.log(`server is running on ${port}`)
})
