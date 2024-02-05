import express from "express";
import con from "../database/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ? and password=?";
  con.query(sql, [re.body.email, req.body.password], (err, result) => {
    
    if (err) return res.json({ loginStatus: false, Error: "Query failed" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "dolyne_katrinah23",
          { expiresIn: "5d" }
        
      );
      res.cookie("token", token)
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

export { router as adminRouter };
