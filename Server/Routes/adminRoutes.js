import express from "express";
import con from "../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ? and password=?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query failed" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "dolyne_katrinah23",
        { expiresIn: "5d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/addCategory", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});
router.post("/addEmployee", (req, res) => {
  const sql =
    "INSERT INTO employee (name, email, password, salary, address, image, category_id) VALUES (?)";
  bcrypt.hash(req.body.password, 15, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.body.image,
      req.body.category_id,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
    });
  });
});
export { router as adminRouter };
