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

// @desc    add a new tutor
// @route   POST /AcceptTutor
// @access  private
export const TutAddModule = asyncHandler(async (req, res) => {
  const { tutorId, moduleCode } = req.body;
  console.log(req.body)
  var getModule = await moduleExists(moduleCode);
  if (!getModule) {
    const rows = await pool.query(
      `INSERT INTO tutorModule (tutorId,moduleCode,allocated)
       VALUES (?,?,0)
      `,
      [tutorId, moduleCode]
    );

    res.status(201);
    return;
  }

  res.status(400).send("module code already exists");
});

// @desc    delete a module
// @route   DELETE /module
// @access  private
export const DeleteModule = asyncHandler(async (req, res) => {
  const { code } = req.body;

  var getModule = await moduleExists(code);
  console.log(getModule);
  if (getModule) {
    const rows = await pool.query(
      ` DELETE FROM module 
        WHERE code=?
      `,
      [code]
    );
    console.log(rows);
    res.status(200).send("Module Deleted");

    return;
  }

  console.log("Module not found");
  res.status(204).send("Module not found");
});

// @desc    add a new Module
// @route   POST /addModule
// @access  private
export const ManAddModule = asyncHandler(async (req, res) => {
  const { name, description, price, code } = req.body;
  var _date = new Date();

  if (!(await moduleExists(code))) {
    const rows = await pool.query(
      `INSERT INTO module (name,description,_date,price,code)
        VALUES (?,?,?,?,?)
          `,
      [name, description, _date, price, code]
    );

    const module = await getMod(code);
    res.status(201).send(module[0]);
    return;
  }

  res.status(400).send("module code already exists");
});

// @desc    add a new Module
// @route   POST /addModule
// @access  private
export const UpdateModule = asyncHandler(async (req, res) => {
  const { name, description, price, code } = req.body;

  if (await moduleExists(code)) {
    const rows = await pool.query(
      `UPDATE module
       SET name=?,description=?,price=?,code=?
       WHERE code = ?`,
      [name, description, price, code, code]
    );

    const module = await getMod(code);
    res.status(201).send(module[0]);
    return;
  }

  res.status(400).send("module couldnt be updated");
});

export const getMod = asyncHandler(async (code) => {
  return await pool.query(
    `
            SELECT *
            FROM module
            WHERE code=?
            `,
    [code]
  );
});

export const getModule = asyncHandler(async (req, res) => {
  const { code } = req.body;
  var mod = await getMod(code);
  if (mod[0].length > 0) {
    res.status(200).send(mod[0]);
    return;
  }
  res.status(404);
});

export const getModuleById = asyncHandler(async (Id) => {
  var mod = await pool.query(
    ` SELECT *
      FROM module
      WHERE Id=?
      `,
    [Id]
  );
  return mod;
});

export const getTutModule = asyncHandler(async (req, res) => {
  const { Id } = req.body;
  console.log("getTutModule" + Id);
  const modules = await pool.query(
    `
            SELECT * FROM studentmodule
            where studentId=?
            `,
    [Id]
  );

  console.log(modules[0]);
  res.send(modules[0]);
});

export const getModules = asyncHandler(async (req, res) => {
  console.log("module");
  const modules = await pool.query(
    `
            SELECT *
            FROM module
            `
  );
  res.send(modules[0]);
});
export const moduleExists = asyncHandler(async (code) => {
  const result = await getMod(code);

  // user exists
  if (result[0].length > 0) {
    return true;
  }

  return false;
});

export const getStudentsByCode = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { moduleCode } = req.body;

  var [result] = await pool
    .query(
      `SELECT * FROM bridgemts
     WHERE moduleCode=?`,
      [moduleCode]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  var students = [];

  for (var i = 0; i < result.length; i++) {
    var student = await getStudentById(result[i].studentId);
    students.push(student);
  }

  res.send(students);
});

export const getTutorsByCode = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { moduleCode } = req.body;

  var [result] = await pool
    .query(
      `SELECT * FROM tutormodule
     WHERE moduleCode=?`,
      [moduleCode]
    )
    .catch((err) => {
      res.status(401);
      console.log(err);
      throw Error(err);
    });

  var tutors = [];

  for (var i = 0; i < result.length; i++) {
    var tempTutor = await getTutorById(result[i].tutorId);
    tutors.push(tempTutor);
  }

  res.send(tutors);
});