import mysql from "mysql2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import {
  getUserById,
  userExists,
  getUserByEmail,
} from "../Models/userModel.js";
import { get } from "mongoose";
import { getTutorById } from "./tutorController2.js";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// @desc    Authenticate a user
// @route   POST /login
// @access  Public
export const logIn = asyncHandler(async (req, res) => {
  console.log("connection made /login");

  var { email, password } = req.body;

  var user = await getUserByEmail(email);

  if (user.length > 0 && (await bcrypt.compare(password, user[0].password))) {
    user[0].password = "";
    res.status(200).send({ token: generateToken(user[0].Id), ...user[0] });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Register new user
// @route   POST /register
// @access  Public
export const regUser = asyncHandler(async (req, res) => {
  console.log("connection made /register");

  var { name, surname, password, usertype, email } = req.body;

  // error handling
  if (!name || !email || !password || !surname) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (await userExists(email)) {
    console.log(await userExists(email));
    res.status(400);
    throw new Error("User already exists");
  }

  // default usertype
  if (!usertype) usertype = "S";

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  var username = email;
  // CreateUser
  const [result] = await pool.query(
    `
              INSERT INTO users (name,surname,username,password,usertype,email)
              VALUES (?,?,?,?,?,?)
              `,
    [name, surname, username, hashedPassword, usertype, email]
  );

  //handle result
  const user = await getUserById(result.insertId);
  res.status(201).send(user[0]); // success, and changes were made
  return user[0];
  console.log(user[0]);
});

// @desc    Authenticate a user
// @route   POST /login
// @access  Public
export const updateUser = asyncHandler(async (req, res) => {
  console.log("connection made /user/update");

  var { name, surname, username, password, usertype, email, qualification } =
    req.body;

  var user = await getUserByEmail(email);

  if (user.length > 0) {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      `UPDATE users
       SET name=?,
       surname=?,
     WHERE email =?;`,
      [name, surname, email]
    );

    user[0].password = "";
    res.status(200);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const getStudentById = asyncHandler(async (Id) => {
  const [result] = await pool
    .query(
      `Select * from users
   WHERE Id = ? `,
      [Id]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  return result[0];
});

export const getMe = asyncHandler(async (req, res) => {
  const { Id } = req.body;
  console.log("//getStudent");
  const [result] = await pool
    .query(
      `Select * from users
       WHERE Id = ? `,
      [Id]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });
  console.log(result[0]);
  res.status(200).send(result[0]);
});

export const myModules = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const [result] = await pool.query(
    `Select * from studentmodule
     WHERE studentId = ? `,
    [userId]
  );

  var toReturn = [];

  for (let i = 0; i < result.length; i++) {
    const [r] = await pool.query(
      `Select * from module
       WHERE Id = ? `,
      [result[i].moduleCode]
    );
    console.log(r[0]);
    toReturn.push(r[0]);
  }

  res.send(toReturn);
});

export const myModule = asyncHandler(async (req, res) => {
  const { userId, moduleId } = req.body;
  const result = await pool.query(
    `Select * from studentmodule
     WHERE studentId = ? and moduleCode=?`,
    [userId, moduleId]
  );
  res.send(result[0]);
});

export const AddModule = asyncHandler(async (req, res) => {
  const { userId, moduleId } = req.body;
  const result = await pool.query(
    `INSERT INTO studentmodule (studentId,moduleCode)
     VALUES (?,?)`,
    [userId, moduleId]
  );

  res.send(result[0]);
});

// Generate JWT
const generateToken = (Id) => {
  return jwt.sign({ Id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export const uploadDoc = asyncHandler(async (req, res) => {
  var { file, fileName, fileDescription, moduleId, userId } = req.body;
  const [result] = await pool.query(
    `         INSERT INTO schoolDocs (file, fileName, fileDescription,moduleId,userId)
              VALUES (?, ?, ?,?,?)
              `,
    [file, fileName, fileDescription, moduleId, userId]
  );
  res.send(result);
});

export const uploadPOP = asyncHandler(async (req, res) => {
  var { moduleCode, studentId } = req.body;
  const datePaid = new Date();
  const pop = req.file.buffer.toString("base64");
  const [rows] = await pool

    .query(
      `UPDATE studentmodule
      SET pop = ? , datePaid = ?
      WHERE moduleCode=? and studentId=?;`,
      [pop, datePaid, moduleCode, studentId]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });
  res.send(rows);
});

// @desc    Apply to be a tutor
// @route   POST /Apply
// @access  Public
export const apply = asyncHandler(async (req, res) => {
  console.log("connection made /apply");

  var { name, surname, password, usertype, email } = req.body;

  // error handling
  if (!name || !email || !password || !surname) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (await userExists(email)) {
    console.log(await userExists(email));
    res.status(400);
    throw new Error("User already exists");
  }

  // default usertype
  if (!usertype) usertype = "W";

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  var username = email;
  // CreateUser
  const [result] = await pool.query(
    `
              INSERT INTO users (name,surname,username,password,usertype,email)
              VALUES (?,?,?,?,?,?)
              `,
    [name, surname, username, hashedPassword, usertype, email]
  );

  //handle result
  const user = await getUserById(result.insertId);
  res.status(201).send(user[0]); // success, and changes were made
  return user[0];
  console.log(user[0]);
});

export const getStudents = asyncHandler(async (req, res) => {
  const rows = await pool.query(
    ` SELECT *
      FROM users 
      WHERE usertype=?
      `,
    ["S"]
  );
  res.send(rows[0]);
});

export const paidModules = asyncHandler(async (req, res) => {
  var { userId } = req.body;
  const [result] = await pool.query(
    `Select * from studentmodule
     WHERE paid = ? and
     studentId=?`,
    [1, userId]
  );

  var toReturn = [];

  for (let i = 0; i < result.length; i++) {
    const [r] = await pool.query(
      `Select * from module
       WHERE Id = ? `,
      [result[i].moduleCode]
    );
    console.log(r[0]);
    toReturn.push(r[0]);
  }

  res.send(toReturn);
});

export const unpaidModules = asyncHandler(async (req, res) => {
  var { userId } = req.body;
  const [result] = await pool.query(
    `Select * from studentmodule
     WHERE studentId=? and
     paid=?`,
    [userId, 0]
  );

  var toReturn = [];

  for (let i = 0; i < result.length; i++) {
    const [r] = await pool.query(
      `Select * from module
       WHERE Id = ? `,
      [result[i].moduleCode]
    );
    console.log(r[0]);
    toReturn.push(r[0]);
  }

  res.send(toReturn);
});

export const studentGetPOP = asyncHandler(async (req, res) => {
  const { studentId } = req.body;
  console.log(studentId);

  const rows = await pool.query(
    // fetches  pop for student themselves
    `select * from studentmodule
     WHERE  studentId = ? and pop IS NOT NULL
     `,
    [studentId]
  );
  res.status(200).send(rows[0]);
});

export const getLink = asyncHandler(async (req, res) => {
  var { tutorId, moduleCode } = req.body;

  const [rows] = await pool.query(
    `SELECT * FROM class
    WHERE tutorId=? and moduleCode=?
    `,
    [tutorId, moduleCode]
  );
  res.send(rows);
});

export const getTutorByIdCode = asyncHandler(async (req, res) => {
  const { moduleCode, studentId } = req.body;
  const [rows] = await pool.query(
    // fetches  pop for student themselves
    `select * from bridgemts
     WHERE  studentId = ? and moduleCode =?
     `,
    [studentId, moduleCode]
  );
  const Id = rows[0].tutorID;

  // return {} if Id is nothing
  const tutor = !Id ? {} : await getTutorById(Id);
  res.status(200).send(tutor);
});

export const getTasks = asyncHandler(async (req, res) => {
  const { moduleCode, tutorId } = req.body;
  const [rows] = await pool.query(
    // fetches  pop for student themselves
    `select * from tasks
     WHERE  tutorID = ? and moduleCode
     `,
    [tutorId, moduleCode]
  );

  res.status(200).send(rows);
});

export const postSubmission = asyncHandler(async (req, res) => {
  console.log(req.body);
  var { taskId, studentId, documentName, date } = req.body;
  const document = req.file.buffer.toString("base64");
  console.log({ taskId, studentId, documentName, date });
  date = new Date();
  const [rows] = await pool
    .query(
      `INSERT INTO tasksubmission (taskId, studentID, document, _date, documentName)
         VALUES  (?,?,?,?,?)`,
      [taskId, studentId, document, date, documentName]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  res.status(201).send(rows[0]);

  return;
});

export const getMySubmission = asyncHandler(async (req, res) => {
  console.log("mysubmission");
  const { taskId, studentId } = req.body;

  const result = await _getMySubmission(taskId, studentId).catch((err) => {
    res.status(401);
    console.log(err);
    throw Error(err);
  });

  res.send(result);
});

export const _getMySubmission = asyncHandler(async (taskId, studentId) => {
  const [task] = await pool
    .query(
      `Select * from tasksubmission
       where studentId=? and taskId=?
 `,
      [studentId, taskId]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  return task;
});
export const MyPerfomance = asyncHandler(async (req, res) => {
  const { moduleCode, tutorId, studentId } = req.body;
  const [rows] = await pool.query(
    `select * from tasks
     WHERE  tutorID = ? and moduleCode
     `,
    [tutorId, moduleCode]
  );

  var tasks = rows;
  var performance = [];

  for (var i = 0; i < tasks.length; i++) {
   var [task] = await _getMySubmission(tasks[i].taskId,studentId) 

  await  performance.push({task:tasks[i],submission:task})

  }
  res.send(performance);
});
