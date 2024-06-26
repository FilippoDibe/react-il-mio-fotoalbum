const express = require("express");
const cors = require("cors");
const app = express();

// routers
const photoRouter = require("./routers/photoRouter.js")


require("dotenv").config();
const {HOST} = process.env;
const port = 3000;


app.use(cors());
app.use(express.static("public"));
app.use(express.json());


// rotte 
app.use('/photo', photoRouter);

app.listen(port,()=>{
    console.log(`server back-end: ${HOST}:${port}`);
})

