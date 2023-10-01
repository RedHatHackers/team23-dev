import mysql from "mysql2";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { query } from "express";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// @desc    add a new tutor
// @route   POST /AcceptTutor
// @access  private
export const AcceptTutor = asyncHandler(async (req, res) => {
  const { Id } = req.body;
  const rows = await pool
    .query(
      `UPDATE users
       SET usertype=?
       WHERE Id=?;
      `,
      ["T", Id]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });
  console.log(rows);
  res.status(200).send(rows[0]);
});

// @desc    Authenticate a user
// @route   POST /RejectTutor
// @access  private

export const RejectTutor = asyncHandler(async (req, res) => {
  const { Id } = req.body;
  const rows = await pool.query(
    `Update users
     set usertype=?
     WHERE Id=?
     `,
    ["D", Id]
  );

  res.status(200).send(rows[0]);
});

// @desc    Authenticate a user
// @route   get /GetApplications
// @access  private
export const GetApplications = asyncHandler(async (req, res) => {
  const rows = await pool.query(
    `select * from users
         WHERE usertype=?;
        `,
    ["W"]
  );
  res.status(200).send(rows[0]);
});

// allocate tutor to a module
export const allocateTutorToModule = asyncHandler(async (req, res) => {
  const { tutorId, moduleId } = req.body;
  
  console.log(tutorId,moduleId)
  const result = await pool.query(
    `INSERT INTO tutormodule (tutorId,moduleCode,allocated)
     VALUES (?,?,?)`,
    [tutorId, moduleId,1]
  )
  .catch((err) => {
    res.status(401);
    console.log(err);
    throw Error(err);
  });
    
  res.send(result);
});

// alloacte student to a Tutor
export const allocateTutorToStudent = asyncHandler(async (req, res) => {
  const { studentId, tutorId , moduleCode} = req.body;
  
  const rows = await pool.query(
    `UPDATE bridgemts
     SET tutorID=?
     WHERE studentId = ? and moduleCode=? ;`,
    [tutorId, studentId,moduleCode]
  )
  .catch((err) => {
    res.status(401);
    console.log(err);
    throw Error(err);
  });

  console.log(rows[0])
  res.send(rows[0]);
});

// Confirms that a student payed for their module fees
//adds user and module in bridgemts
export const confirmPayment = asyncHandler(async (req, res) => {
  const { studentId, moduleCode } = req.body;
  console.log(req.body);
  await pool
    .query(
      `UPDATE studentmodule
     SET paid = 1
     WHERE moduleCode=? and studentId=? ;`,
      [moduleCode, studentId]
    )
    .catch((err) => {
      res.status(401);
      console.log({ err, line: "99" });
      throw Error(err);
    });

  const [rows] = await pool
    .query(
      `INSERT INTO bridgemts (moduleCode, studentId)
       VALUES (?,?)`,
      [moduleCode, studentId]
    )
    .catch((err) => {
      res.status(401);
      console.log({ err, line: "99" });
      throw Error(err);
    });

  console.log(moduleCode, studentId);
  res.send(rows);
});

// proof of payment
// students who uploaded
export const getProof = asyncHandler(async (req, res) => {
  console.log("//proof");
  const rows = await pool
    .query(
      // fetches students who upploaded a pop
      `select * from studentmodule
     WHERE pop IS NOT NULL and paid=0
     `
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });
  res.status(200).send(rows[0]);
});

export const getstudentCount = asyncHandler(async(req,res)=>{
  const [rows] = await pool
  .query(
    `SELECT COUNT(*) as total  FROM users
    WHERE usertype=?`,["S"]
  )
  res.send(rows[0])
})

export const getTutorCount = asyncHandler(async(req,res)=>{
  const [rows] = await pool
  .query(
    `SELECT COUNT(*) as total  FROM users
    WHERE usertype=?`,["T"]
  )
  res.send(rows[0])
})

export const getModuleCount = asyncHandler(async(req,res)=>{
  const [rows] = await pool
  .query(
    `SELECT COUNT(*) as total FROM module
  `
  )
  res.send(rows[0])
})

export const getModuleTutorCount = asyncHandler(async(req,res)=>{
  var  [modules] = await pool
  .query(
    `SELECT * FROM module
  `
  )

  modules
  
  var moduleTutorCount = [];
  
  for (var i = 0; i < modules.length; i++) {
    const module=modules[i]
    var  [tutorCount] = await pool
    .query(
      `SELECT COUNT(*) as tutors FROM tutormodule
      where moduleCode =?
      `,[module.Id]
    )
    
    var  [studentCount] = await pool
    .query(
      `SELECT COUNT(*) as students FROM studentmodule
       where moduleCode =? and paid =1
      `,[module.Id]
    )
    moduleTutorCount.push({...tutorCount[0],...studentCount[0],name:module.name});
  }

  res.send(moduleTutorCount);
  
})
