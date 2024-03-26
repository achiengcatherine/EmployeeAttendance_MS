import express from "express";
import con from "../database/db.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
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
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "No Record Existed" });
    }
  });
});

router.post("/register", (req, res) => {
  const sql =
    "INSERT INTO register (name, email, password, confirm_password) VALUES (?, ?, ?, ?)";

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Hashing Error" });

    con.query(
      sql,
      [req.body.name, req.body.email, hash, req.body.confirm_password],
      (err, result) => {
        if (err)
          return res.json({
            registerStatus: false,
            Error: "Query failed:" + err.message,
          });
        return res.json({ registerStatus: true, Result: result });
      }
    );
  });
});

router.post("/userLogin", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM register WHERE email = ?";
  con.query(sql, [email], async (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ loginStatus: false, Error: "Database error" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ loginStatus: false, Error: "No Record Existed" });
    }

    // Compare hashed password
    const match = await bcrypt.compare(password, result[0].password);
    if (!match) {
      return res
        .status(401)
        .json({ loginStatus: false, Error: "Invalid email or password" });
    }

    const email = result[0].email;
    const token = jwt.sign(
      { role: "employee", email: email },
      "dolyne_katrinah23",
      { expiresIn: "5d" }
    );
    res.cookie("token", token);
    return res.status(200).json({ loginStatus: true });
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
        return res.json({ Status: false, Error: "Query Error" + err });
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
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/deleteEmployee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/markAttendance/:id", (req, res) => {
  const id = req.params.id;
  const { employee, attendanceStatus } = req.body;

  const attendanceDateTime = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " "); // Current date and time
  const sql =
    "INSERT INTO attendance (employee_id, attendance_status, attendance_datetime) VALUES (?, ?, ?)";
  const values = [id, attendanceStatus, attendanceDateTime];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error storing attendance:", err);
      res
        .status(500)
        .json({ Status: false, Error: "Error storing attendance" });
      return;
    }
    console.log("Attendance record stored successfully");
    res.json({ Status: true, Message: "Attendance recorded successfully" });
  });
});
router.get("/adminRecords", (req, res) => {
  const sql = "SELECT * FROM admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});
export { router as adminRouter };
