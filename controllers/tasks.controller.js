import {pool} from '../db.js';
import {validationResult, check } from 'express-validator'
const getTasks = async(req,res) => {
    try {
        const [rows] = await pool.query(`select * from task`);
        res.json(rows);
    }catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
};

const getTask = async(req,res) => {
    const {id} = req.params;
    try {
        const [rows] = await pool.query(`select * from task where id = ?`,[id]);
        if(rows.length <= 0) return res.status(404).json({message:'Task not found'});
        res.json(rows[0]);
    }catch(err) {
        return res.status(500).json({message: `Error: ${err.message}`});
    }
};

const createTasks = async(req,res) => {
    const {title, description} = req.body;
    /*if (!title || !description){
        return res.status(400).json({message:'Title and Description cannot be empty'});
      }*/
    const errors = validationResult(req);
    if (!title){
        errors.errors.push({msg: 'Title cannot be empty', param: 'title'})
    }
    if (!description){
        errors.errors.push({msg: 'Description cannot be empty', param: 'description'})
    }
    if (title.includes('<script>')){
        errors.errors.push({msg: 'Invalid characters in the Title', param: 'title'})
    }
    if (description.includes('<script>')){
        errors.errors.push({msg: 'Invalid characters in the Description', param: 'description'})
    }

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const [result] = await pool.query(`insert into task (title, description) values(?,?)`,[title, description]);
        res.send({
            id: result.insertId,
            title,
            description
        });
    }catch(err) {
        return res.status(500).json({message: `Error ${err.message}`});
    }
};

const updateTasks = async(req,res) => {
    const {id} = req.params;
    const {title, description, done} = req.body;
    if ((!title || !description) && done === undefined){
        return res.status(400).json({message:'Title and Description cannot be empty'});
      }
    try {
        const [result] = await pool.query(`update task set ? where id = ?`,[req.body,id]);
        if (result.affectedRows <=0) return res.status(404).json({message: 'Task not found'});
        const [rows] = await pool.query(`select * from task where id = ?`,[id]);
        res.json(rows);
    }catch(err) {
        return res.status(500).json({message: `Error ${err.message}`});
    }
};

const deleteTasks = async(req,res) => {
    const {id} = req.params;
    try {
        const [result] = await pool.query(`delete from task where id = ?`,[id]);
        if (result.affectedRows <=0) return res.status(404).json({message: 'Task not found'});
        res.sendStatus(204);
    }catch(err) {
        return res.status(500).json({message: `Error ${err.message}`});
    }
};

export {getTasks, getTask, createTasks, updateTasks, deleteTasks}