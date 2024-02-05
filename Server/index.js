import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/adminRoutes.js";


const app = express();

// Enable cors at the server side.

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));


app.use(express.json());
app.use("/auth", adminRouter);

const server = http.createServer(app);
server.listen(3000, "localhost");
server.on("listening", () => {
  console.log("Server is running");
});
