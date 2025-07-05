import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app,server } from "./lib/socket.js"
dotenv.config()



const PORT = process.env.PORT;
app.use(cookieParser())
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", // or the actual frontend URL
  credentials: true
}));

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)


server.listen(PORT,()=>{
    console.log("Server Started on: "+PORT)
    connectDB()
})