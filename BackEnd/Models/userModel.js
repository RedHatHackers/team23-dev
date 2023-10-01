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

export const getUserById = asyncHandler(async (userId) => {
  const rows = await pool.query(
    `
       SELECT Id, name, surname, username, usertype, email
       FROM users 
       WHERE Id=?
      `,
    [userId]
  );
  return rows[0];
});

export const getUserByEmail = asyncHandler(async (email) => {
  const rows = await pool.query(
    `
      SELECT Id, name, surname, username, usertype, email,password
      FROM users 
      WHERE email=?
      `,
    [email]
  );
  return rows[0];
});

export const userExists = asyncHandler(async (email) => {
  const result = await pool.query(
    `
      SELECT Id, name, surname, username, usertype, email
      FROM users
      WHERE email=?
      `,
    [email]
  );

  // user exists
  if (result[0].length > 0) {
    return true;
  }

  return false;
});


export const isPaid = asyncHandler(async (paid) => {
  const result = await pool.query(
    `
      SELECT studentId,moduleCode,paid
      FROM studentmodule
      WHERE paid=?
      `,
    [paid]
  );

  // user exists
  if (result[0].length > 0) {
    return true;
  }

  return false;
});
