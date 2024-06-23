const express = require('express');
const mongoose = require('mongoose');
const User = require('./usermodel');
const jwt = require('jsonwebtoken');
const middleware= require('./middleware');
const middlewareAdmin= require('./middlewareAdmin');
const cors = require('cors');
const app = express();

mongoose.connect(`mongodb://127.0.0.1:27017/vrikshayan`).then(() => {
    console.log('Connected to the database');
});

app.use(express.json());

app.use(cors());

app.post('/register', async (req, res) => {
    try {
        const ans = await User.findOne({email: req.body.email});
        if (ans) {
            return res.status(400).send("User already exists");
        }
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/login', async (req, res) => {
    try{
        const user = req.body;
        const ans = await User.findOne({email: user.email});
    if (!ans ) {
        return res.status(400).send("wrong credentials");
    }
    if (ans.password !== user.password ) {
        return res.status(400).send("wrong credentials");
    }
    
    let payload={
        user:
        {
            id:ans.id
        }
    }
    jwt.sign(payload,'vrikshayan',{expiresIn: 360000}  ,(err,token)=>
    {
        if(err) throw err;
        return res.status(200).json({token});
    })

    }catch(error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

app.get('/myprofile', middleware,async (req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        return res.json(user);
    }catch(error){
        console.log(error);
        return res.status(400).send(error);
    }
})

app.get('/allusers',middlewareAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:3000');
});