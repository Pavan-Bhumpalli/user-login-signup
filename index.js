const express = require('express');
const mongoose = require('mongoose');
const User = require('./usermodel');
const app = express();

mongoose.connect("mongodb+srv://pavanbhumpalli:8TGWil1Btu3PMRmd@vrikshayan.m7tq8bv.mongodb.net/?retryWrites=true&w=majority&appName=vrikshayan").then(() => {
    console.log('Connected to the database');
});

app.use(express.json());

app.post('/register', async (req, res) => {
    try {
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
    return res.status(200).send("Login successfull");
    }catch(error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});