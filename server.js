import "./env.js"
import express from "express"
import bodyParser from "body-parser"
import ApplicationError from "./src/error/applicationError.js"
import connectUsingMongoose from "./src/config/mongoose.config.js"
import userRouter from "./src/features/user/user.routes.js"
import loggerMiddleware from "./src/middleware/logger.middleware.js"
import CandidateRouter from "./src/features/candidate/canditate.routes.js"

//server
const server = express();

//all middleware
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true })); // use for: When a client submits a form with data using the application/x-www-form-urlencoded content type, this middleware parses the data and makes it available in req.body.
server.use(loggerMiddleware);

// for all request releted app
server.use("/api/users", userRouter);
server.use("/api/candidates", CandidateRouter);

// all api
server.get("/", (req, res)=>{
    res.send("Welcome to Votting App");
})
server.use((err, req, res, next)=>{ //Application Error Handler
    if(err instanceof ApplicationError){
        res.status(err.statusCode).send(err.message);
    }
    res.status(500).send("server error! Try later!!");
    next();
})
server.use((req, res)=>{ //for any invalid API request
    res.status(404).json("API not found "); //Please check our documentation for more information at localhost:3200/api-docs. use sagger
});

// port
server.listen(8000, ()=>{
    connectUsingMongoose();
    console.log("Server listen on 8000");
})