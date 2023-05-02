const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenicate } = require("../middlewares/authenticate");
const { Postmodel } = require("../models/post.model");
const { Usermodel } = require("../models/user.model");

const postRoute = express.Router();

// add post
postRoute.post("/posts", authenicate ,async (req,res)=>{
    try {
        let data = req.body;
        const post = new Postmodel(data);
        await post.save();
        res.status(201).send(post);
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

// get all post
postRoute.get("/posts", authenicate , async (req,res)=>{
    try {
        const post = await Postmodel.find();
        res.status(200).send(post);
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

// get each post
postRoute.get("/posts/:id", authenicate , async (req,res)=>{
    try {
        const ID = req.params.id;
        const post = await Postmodel.findOne({_id: ID});
        res.status(200).send(post);
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

// update post
postRoute.patch("/posts/:id", authenicate , async (req,res)=>{
    try {
        const ID = req.params.id;
        const update = req.body;
        const post = await Postmodel.findByIdAndUpdate({_id:ID}, update);
        res.status(204).send(`Post with ID ${ID} is updated`);
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

// delete post
postRoute.delete("/posts/:id", authenicate , async (req,res)=>{
    try {
        const ID = req.params.id;
        const post = await Postmodel.findByIdAndDelete({_id:ID});
        res.status(202).send(`Post with ID ${ID} is deleted`);
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

// add likes
postRoute.post("/posts/:id/like", authenicate , async (req,res)=>{
    try {
        const ID = req.params.id;
        const post = await Postmodel.findOne({_id:ID});
        let data = req.body;
        post.likes.push(data);
        post.save();
        res.status(201).send(post);
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

// add comments
postRoute.post("/posts/:id/comment", authenicate , async (req,res)=>{
    try {
        const ID = req.params.id;
        const post = await Postmodel.findOne({_id:ID});
        let data = req.body;
        post.comments.push(data);
        post.save();
        res.status(201).send(post);
    } catch (err) {
        console.log(err);
        res.send({message: err.message});
    }
})

module.exports = {
    postRoute
}