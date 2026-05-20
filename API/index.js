const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require ('dotenv').config();

const app = express();

const pool = new Pool({
    connectionString:process.env.database,
    ssl:{
        rejectUnauthorized : false
    }
});

app.get('/',(req,res)=>{
    try {
        res.json('welcome')
    } catch (err) {
        res.status(500).json({error:err.message})
        
    }
});

app.get('/reg',async(req,res)=>{
    try {
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error:err.message})
        
    }
});

app.listen(3000,()=>{
    console.log('server is running on port 3000');
});