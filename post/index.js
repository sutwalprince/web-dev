const express = require('express');
const app = express();

const cors = require('cors');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());

app.use(bodyParser.json({limit :"50mb"}));

app.use(bodyParser.urlencoded({limit :"50mb" , parameterLimit:100000,extended:true}));

dotEnv.config({path:"./.env"});

const port = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_DB_URL,{useNewUrlParser : true, useUnifiedTopology:true})
.then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log(err);

});

app.use("/api",require("./routes/Crud"));


app.listen(port,()=>{
    console.log(`server started at ${port}`);
})