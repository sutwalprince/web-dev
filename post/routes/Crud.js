const express = require("express");
const router = express.Router();

const Post  = require("../models/Post");


// to add new entry in data base 
router.post("/" , async(req, res)=>{
    try{
        let {name,text , image }= req.body;
        let post = new Post({name,text,image});
        await post.save();
        res.status(200).json({msg:"post saved successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"something went wrong"});
    }
});


// to update any entry in database
router.put("/:postId" ,async(req,res)=>{
    try{
        let {name,text , image }= req.body;
        let postObj = {};
        postObj.name = name;
        postObj.image = image;
        postObj.text = text;

        await Post.findOneAndUpdate({_id:req.params.postId},
            {$set:postObj},
            {new:true});
            
            res.status(200).json({msg:"post updated successfully"});
        }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"something gone wrong"});
    }
});

// to get all the entrys/posts in database
router.get("/",async(req,res)=>{
    try{
        let posts = await Post.find();
        res.status(200).json({posts : posts});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"something gone wrong"});
    }
});

// get a single post from database
router.get("/:postId",async(req,res)=>{
    try{
        let post = await Post.findById(req.params.postId);
        res.status(200).json({post : post});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"something gone wrong"});
    }
});

router.delete("/:postId",async(req,res)=>{
    try{
        await Post.findByIdAndRemove(req.params.postId); 
        res.status(200).json({msg : "post deleted successfully."});  
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"something gone wrong"});
    }
});

module.exports = router;