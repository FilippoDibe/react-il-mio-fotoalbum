const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");  


// routers
const photoRouter = require("./routers/photoRouter.js")
const userRouter = require("./routers/authRouter.js")
const categoryRouter = require("./routers/categoryRouter.js")
const messageRouter = require("./routers/messageRouter.js")

require("dotenv").config();
const {HOST} = process.env;
const port = 3000;


app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));


// rotte 
app.use('/photo', photoRouter);
app.use('/user', userRouter)
app.use("/category", categoryRouter)
app.use("/message", messageRouter)

app.listen(port,()=>{
    console.log(`server back-end: ${HOST}:${port}`);
})

