import pool from '../../config/db'
import users from '../Models/userModel'


export const getTutorByActive = asyncHandler(async (isActive) => {
    const rows = await pool.query(
      `
        SELECT Id, qualification, experience, userId, isTutor, academicRecord
        FROM tutor 
        WHERE isActive=Y
        `,
      [isActive]
    );
    return rows[0];
  })