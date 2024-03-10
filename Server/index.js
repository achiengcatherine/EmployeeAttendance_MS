import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/adminRoutes.js";


const app = express();

// Enable cors at the server side.

/** Define the origin that you want to allow
const allowedOrigins = ['http://localhost:5173'];

// Enable CORS middleware with specific origin
app.use(cors({
  origin: function (origin, callback) {
    // Check if the origin is allowed
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));*/

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));


app.use(express.json());
app.use("/auth", adminRouter);
app.use(express.static('public'))


app.listen(3000, () => {
  console.log("Server is running");
});
