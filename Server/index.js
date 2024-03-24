import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/adminRoutes.js";
import cookieParser from "cookie-parser";


const app = express();

// Enable cors at the server side.

app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser())
app.use(express.json());
app.use("/auth", adminRouter);
app.use(express.static('public'))


app.listen(3000, () => {
  console.log("Server is running");
});
