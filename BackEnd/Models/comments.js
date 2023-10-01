import pool from '../../config/db.js'
import commentSql from '../Queries//models/commentModel.js'
export async function getNote(id){
const [rows] = await pool.query(`


`,[id])
return rows[0]
}


export async function createComment(userId,postId,comment){
    const [result] = await pool.query(`
    INSERT INTO Comment (userId,postId,comment)
    VALUES (?,?,?)
    `,[userId,postId,comment])
}