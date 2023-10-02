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

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// @desc    add a new task
// @route   POST /Tutor Add task
// @access  private
export const TutAddTask = asyncHandler(async (req, res) => {
  var { code, tutorId,total, title, duedate } = req.body;
  const taskDocument = req.file.buffer.toString("base64");
  console.log({ code, tutorId, title, duedate });
  duedate = new Date(duedate);
  const [rows] = await pool
    .query(
      `INSERT INTO tasks (moduleCode, tutorID, title, duedate, taskDocument,total)
       VALUES  (?,?,?,?,?,?)`,
      [code, tutorId, title, duedate, taskDocument,total]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });
  console.log(rows);
  res.status(201).send(rows[0]);

  return;
});

export const getTasks = asyncHandler(async (req, res) => {
  console.log("tasks");
  const { moduleCode, tutorId } = req.body;
  const [result] = await pool
    .query(
      `Select * from tasks
    where tutorId=? and moduleCode=?
   `,
      [tutorId, moduleCode]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  res.send(result);
});

export const getTask = asyncHandler(async (req, res) => {
  console.log("task");
  const { moduleCode, tutorId, taskId } = req.body;
  const [result] = await pool
    .query(
      `Select * from tasks
       where tutorId=? and moduleCode=? and taskId=?
   `,
      [tutorId, moduleCode, taskId]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  res.send(result);
});


export const getTaskById = asyncHandler(async (req, res) => {
  console.log("getTaskById");
  const { taskId } = req.body;
  const [result] = await pool
    .query(
      `Select * from tasks
       taskId=?
      `,
      [taskId]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  res.send(result);
});

export const TutEditTask = asyncHandler(async (req, res) => {
  var { code, tutorId, title, duedate } = req.body;
  const taskDocument = req.file.buffer.toString("base64");
  console.log({ code, tutorId, title, duedate });
  duedate = new Date(duedate);
  const [rows] = await pool
    .query(
      `Update tasks 
       set title=?, duedate=?, taskDocument=?)
       where tutorId=? and taskId = ?`,
      [title, duedate, taskDocument, tutorId,taskId]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });
  console.log(rows);
  res.status(201).send(rows[0]);

  return;
});
