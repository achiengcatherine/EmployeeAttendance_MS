import express from "express";
import cors from "cors"
import { adminRouter } from "./Routes/adminRoutes.js";

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    method: ['GET', 'POst', 'put'],
    credentials: true
}
))
app.use(express.json())
app.use('/auth', adminRouter)

app.listen(3000, () => {
    console.log("Server is running")
})