const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../models/user.model");
const { authenicate } = require("../middlewares/authenticate");
const { Postmodel } = require("../models/post.model");

const userRoute = express.Router();

// Register
userRoute.post("/register", async (req,res)=>{
    try {
        const data = req.body;
        const user = new Usermodel(data);
        const salt = await bcrypt.genSalt(5);
        user.password = await bcrypt.hash(user.password, salt);
        user.save();
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(201).send({message: err.message});
    }
})

// Login
userRoute.post("/login", async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await Usermodel.findOne({email});
        if(user != undefined){
            const result = await bcrypt.compare(password, user.password);
            if(result){
                const token = await jwt.sign({userId: user._id}, process.env.key);
                res.send({token, userId: user._id});
            }else{
                res.send({message: "Wrong Credential"});
            }
        }else{
            res.status(201).send({message: "Wrong Credential"});
        }
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

// get all user
userRoute.get("/users", async (req,res)=>{
    try {
        const user = await Usermodel.find();
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

// get all friend list
userRoute.get("/users/:id/friends", authenicate, async (req,res)=>{
    try {
        const ID = req.params.id;
        const user = await Usermodel.findOne({_id: ID});
        res.status(200).send(user.friends);
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

// send friend request
userRoute.post("/users/:id/friends", authenicate, async (req,res)=>{
    try {
        const ID = req.params.id;
        const user = await Usermodel.findOne({_id: ID});
        let frdRqstData = req.body;
        user.friendRequests.push(frdRqstData);
        await user.save();
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

// accept or reject friend request
userRoute.patch("/users/:id/friends/:friendId", async (req,res)=>{
    try {
        const frndId = req.params.friendId;
        const ID = req.params.id;
        const user = await Usermodel.findOne({_id: ID});
        for(let i=0;i<user.friendRequests.length;i++){
            if(user.friendRequests[i].userID==frndId){
                user.friends.push(user.friendRequests[i]);
                user.friendRequests.splice(i, 1);
                await user.save();
            }
        }
        res.send(user);
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

module.exports = {
    userRoute
}