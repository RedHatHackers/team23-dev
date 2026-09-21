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
import { getStudentById, regUser } from "./userController.js";
import { getModuleById } from "./ModuleController.js";

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
// @route   get /BeATutor
// @access  private
export const BeATutor = asyncHandler(async (req, res) => {
  // REGISTERING USER (PARENT CLASS)
  var { name, surname, password, usertype, email } = req.body;
  // error handling
  if (!name || !email || !password || !surname) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (!usertype) {
    usertype = "W";
  }

  if (await userExists(email)) {
    console.log(await userExists(email));
    res.status(400);
    throw new Error("User already exists");
  }

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

  var { qualification, experience } = req.body;
  const academicRecord = req.file.buffer.toString("base64");


  const rows = await pool.query(
    ` INSERT INTO tutor (qualification, experience, userId ,academicRecord)
      VALUES (?,?,?,?)
      `,
    [qualification, experience, user[0].Id, academicRecord]
  )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  res.status(201).send({
    ...user[0],
  });
});

export const getTutor = asyncHandler(async (req, res) => {
  var { email } = req.body;
  console.log("/getTutor");
  const userData = await getUser(email);
  const tutorData = await _getTutor(userData.Id);

  // so Id wont be overriden
  const tutorId = tutorData.Id;
  const userId = userData.Id;

  const tutor = {
    tutorId,
    userId,
    ...userData,
    ...tutorData,
  };
  res.status(200).send(tutor);
});

// Helper method
async function _getTutor(userId) {
  const rows = await pool.query(
    `
         SELECT *
         FROM tutor 
         WHERE userId=?
        `,
    [userId]
  );
  var result = rows[0];
  return result[0];
}

async function getUser(email) {
  const rows = await pool.query(
    `
         SELECT *
         FROM users 
         WHERE email=?
        `,
    [email]
  );
  if (rows[0].length > 0) {
    var result = rows[0];
    result[0].password = "";
    return result[0];
  }
  return null;
}

// get all tutors
export const getTutors = asyncHandler(async (req, res) => {
  var [userTutors] = await pool.query(
    `    SELECT *
         FROM users 
         WHERE usertype=?
        `,
    ["T"]
  );

  var newTutors = [];

  // for each tutor
  // append Tutor data to user data

  for (var i = 0; i < userTutors.length; i++) {
    var userTutor = { ...userTutors[i] };
    userTutor.password = "";
    var tutordata = await _getTutor(userTutor.Id);
    const tutorId = tutordata.Id;
    const userId = userTutor.Id;
    newTutors.push({
      tutorId,
      userId,
      ...tutordata,
      ...userTutor,
    });
  }
  res.send(newTutors);
});
export const shareLink = asyncHandler(async (req, res) => {
  const { tutorId, moduleCode, sessionName, classDate, classLink } = req.body;
  const result = await pool.query(
    ` INSERT INTO class (tutorId,moduleCode,sessionName,classDate,classLink)
      VALUES(?,?,?,?,?)
         `,
    [tutorId, moduleCode, sessionName, classDate, classLink]
  );
  res.send(result[0]);
  console.log(link);
});

export const addMarks = asyncHandler(async (req, res) => {
  const { taskId, studentId, mark, markedDoc, feedback } = req.body;
  const result = await pool.query(
    `UPDATE tasksubmission 
    SET mark=? , markedDocument=? , feedback=?
    WHERE studentId=? and taskId=?
     `,
    [mark, markedDoc, feedback, studentId, taskId]
  );
  console.log(result[0]);
  res.send(result[0]);
});

export const getTaskSubmissions = asyncHandler(async (req, res) => {
  const { taskId } = req.body;
  const [result] = await pool
    .query(
      `Select * from tasksubmission
       where taskId=?
   `,
      [taskId]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  var task = [];
  console.log(req.body);
  for (var i = 0; i < result.length; i++) {
    var student = await getStudentById(result[i].studentId);
    task.push({ ...result[i], student: student });
  }

  res.send(task);
});

export const getTaskSubmission = asyncHandler(async (req, res) => {
  const { taskId, studentId } = req.body;
  const [task] = await pool
    .query(
      `Select * from tasksubmission
       where taskId=? and studentId =?
   `,
      [taskId, studentId]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  res.send(task[0]);
});

// get student submission for task x
const getSubmission = asyncHandler(async (taskId, userId) => {
  const result = await pool.query(
    `Select * from tasksumbission
    WHERE userId=? and taskId =?
     `,
    [userId, taskId]
  );
  return result[0];
});

export const myStudents = asyncHandler(async (req, res) => {
  const { tutorId } = req.body;
  const [result] = await pool.query(
    `SELECT * FROM bridgemts 
     WHERE tutorId=?
     `,
    [tutorId]
  );
  var students = [];
  console.log(req.body);
  for (var i = 0; i < result.length; i++) {
    var student = await getStudentById(result[i].studentId);
    var [module] = await getModuleById(result[i].moduleCode);
    module = module[0];
    students.push({ student: student, module: module });
  }

  /* return array with student and module databa i.e 
  [  { student :{  }, 
      module : {  } } , 
     ] */
  console.log(students);
  res.send(students);
});

export const myModules = asyncHandler(async (req, res) => {
  const { tutorId } = req.body;
  const [result] = await pool.query(
    `Select * from tutormodule
     WHERE tutorId = ? `,
    [tutorId]
);
  
  var toReturn = [];

  for (let i = 0; i < result.length; i++) {
    const [r] = await pool.query(
      `Select * from module
       WHERE Id = ? `,
      [result[i].moduleCode]
    );
    toReturn.push({...result[i],...r[0]});
  }
  console.log({ myModules: toReturn });
  res.send(toReturn);
});

export const modulesToTutor = asyncHandler(async (req, res) => {
  console.log("module");
  const { tutorId } = req.body
  const [modules] = await pool.query(
    `
            SELECT *
            FROM module

            `
  );


  for (var i = 0; i < modules.length; i++) {
    const [r] = await pool.query(
      `Select * from tutormodule
       WHERE modulecode = ? and tutorId=?`,
      [modules[i].Id, tutorId]
    );

    if (r[0] && modules[i].Id === r[0].moduleCode) {
      // console.log(modules[i].Id)
      await modules.splice(i, 1);

      // move to previous index
      i--;
    }
  }
console.log({length:modules})
  res.send(modules);
});
export const allocatedModules = asyncHandler(async (req, res) => {
  var { tutorId } = req.body;
  const [result] = await pool.query(
    `Select * from tutormodule
     WHERE allocated = ? and
     tutorId=?`,
    [1, tutorId]
  );

  var toReturn = [];

  for (let i = 0; i < result.length; i++) {
    const [r] = await pool.query(
      `Select * from module
       WHERE Id = ? `,
      [result[i].moduleCode]
    );
    toReturn.push(r[0]);
  }

  console.log({ allocatedModules: toReturn, tutorId });
  res.send(toReturn);
});

export const unAllocatedModules = asyncHandler(async (req, res) => {
  var { tutorId } = req.body;
  console.log("//unAllocatedModules")
  const [result] = await pool.query(
    `Select * from tutormodule
     WHERE tutorId=? and
     allocated=?`,
    [tutorId, 0]
  ).catch((err) => {
    res.status(401);
    console.log(err);
    throw Error(err);
  });

  var toReturn = [];

  for (let i = 0; i < result.length; i++) {
    const [r] = await pool.query(
      `Select * from module
       WHERE Id = ? `,
      [result[i].moduleCode]
    );
    toReturn.push(r[0]);
  }
  console.log({ unAllocatedModules: toReturn, tutorId });

  res.send(toReturn);
});
