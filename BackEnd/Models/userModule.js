import pool from '../../config/db'

export async function getNote(id){
const [rows] = await pool.query(`


`,[id])
return rows[0]
}