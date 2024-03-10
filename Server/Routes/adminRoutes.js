import express from "express";
import con from "../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

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


router.post("/adminregister", (req, res) => {
  const sql =
    "INSERT INTO register (name, email, password, confirm_password) VALUES (?, ?, ?, ?)";
  con.query(sql, [req.body.name, req.body.email, req.body.password, req.body.confirm_password], (err, result) => {
    if (err) return res.json({
      registerStatus: false,
      Error: "Query failed:" + err.message,
    });
    return res.json({ registerStatus: true, Result: result });
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

// image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
//end of image upload

router.post("/addEmployee", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const sql =
    "INSERT INTO employee (name, email, password, salary, address, category_id, image ) VALUES (?,?,?,?,?,?,?)";
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Hashing Error" });

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.salary,
      req.body.address,
      req.body.category_id,
      req.file.filename,
    ];
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database Query Error:", err);
        return res.json({ Status: false, Error: "Query Error" });
      }
      return res.json({ Status: true });
    });
  });
});

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/editEmployee/:id", (req, res) => {
  const id = req.params.id; 
  const sql =
    "UPDATE employee set name= ?, email= ?, salary= ?, address= ?, category_id= ? WHERE id= ? ";

  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.category_id,
  ];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});
export { router as adminRouter };
