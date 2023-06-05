const express = require('express');
const app = express();

const cors = require('cors');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json({limit :"50mb"}));

app.use(bodyParser.urlencoded({limit :"50mb" , parameterLimit:100000,extended:true}));

dotEnv.config({path:"./.env"});

const port = process.env.PORT || 5000;


app.get("/hello", (req,res) =>{
    res.send("server response aa gya");
})

app.post("/hello2", (req,res) =>{
    let {num1,num2} = req.body;
    num1+=22;
    num2 -= 1;
    res.send({num1,num2});
})

app.post("/hello2/:name/:email", (req,res) =>{
    let myname = req.params.name;
    let myemail = req.params.email;
    res.send({myname,myemail});
})

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})