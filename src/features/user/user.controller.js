import UserRepository from "./user.repository.js"
import ApplicationError from "./../../error/applicationError.js"
import bcrypt from "bcrypt"
import Jwt  from "jsonwebtoken";

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }

    //Create a new user account.
    async register(req, res){
        try{
            if(req.body.role == "Admin"){
                return res.status(401).send("Admin Already Exits");
            }else{
                req.body.password = await bcrypt.hash(req.body.password, 12);
                const newVoter = await this.userRepository.register(req.body);
                res.status(201).send(newVoter);
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
    //Log in to an existing account.
    async login(req, res){
        try{
            //console.log(req.body.adharCardNumber);
            const voter = await this.userRepository.isValid_AdharCardNumber(req.body.adharCardNumber);
            //console.log(voter)
            if(!voter){
                return res.status(404).send("AdharCard Number Invalid");
            }
            const userPassword = await bcrypt.compare(req.body.password, voter.password);
            if(userPassword){
                const token = Jwt.sign(
                    {
                        UserID : voter._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "2h",
                    }
                );
                console.log(token);
                return res.status(201).send(token);
            }else{
                return res.status(401).send("Wrong Password");
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500)
        }
    }
    // get profile
    async profile(req, res){
        try{
            //console.log(req.body.adharCardNumber)
            const voter = await this.userRepository.get_profile(req.body.adharCardNumber);
            if(voter){
                res.status(200).send(voter);
            }else{
                res.status(401).send("Voter Details Not found");
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
    async updatePassword(req, res){
        try{
            if(req.body.Newpassword){
                req.body.Newpassword = await bcrypt.hash(req.body.Newpassword, 12);
                //console.log(req.body.adharCardNumber)
                //console.log(req.body.Newpassword)
                const voter = await this.userRepository.update_password(req.body.adharCardNumber, req.body.Newpassword);
                res.status(201).send(voter);
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
}