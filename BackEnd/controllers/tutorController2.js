import mysql from "mysql2";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export const getTutorById = asyncHandler(async (Id) => {
  var [resultTutor] = await pool
    .query(
      ` SELECT *
           FROM tutor 
           WHERE Id=?
          `,
      [Id]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  var tutorData = resultTutor[0];

  var [resultUser] = await pool
    .query(
      `    SELECT *
           FROM users 
           WHERE Id=?
          `,
      [tutorData.userId]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });
  var userData = resultUser[0];

  // so Id wont be overriden
  const tutorId = tutorData.Id;
  tutorData.password = "";
  const userId = userData.Id;

  const tutor = {
    tutorId,
    userId,
    ...userData,
    ...tutorData,
  };
  return tutor;
});



export const addAnouncement = asyncHandler(async (req, res) => {
  console.log("//adddanounce"); console.log(req.body);
  const { code, tutorId, heading, announce } = req.body;
  const [result] = await pool
    .query(
      ` INSERT INTO announcement ( moduleCode,tutorId,announceHeading,announce )
      VALUES (?,?,?,?)
      `,
      [code, tutorId, heading, announce]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });
  console.log(result);
  res.status(201).send(result[0]);

  return;
});


// students/tutors get announcements based on module x
export const getAnnouncements = asyncHandler(async (req, res) => {
  console.log("//getAnnouncements"  );
  const { moduleCode, tutorId } = req.body;

  const result = await pool.query(
    `Select * from announcement
    WHERE tutorId=? and modulecode =?
     `,
    [tutorId, moduleCode]
  )
  .catch((err) => {
    res.status(401);
    console.log(err);
    throw Error(err);
  });;
  res.send(result[0]);
});
