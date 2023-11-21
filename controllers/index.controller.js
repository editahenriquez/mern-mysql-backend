import { pool } from "../db.js";
export const ping = async(req, res) => {
    const [rows] = await pool.query(`select' Welcome to MERN Mysql App' as result`);
    res.json(rows[0]);
};