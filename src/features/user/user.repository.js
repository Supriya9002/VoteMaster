import mongoose from "mongoose";
import ApplicationError from "./../../error/applicationError.js"
import UserSchema from "./user.schema.js"

//model
const UserModel = mongoose.model("user", UserSchema);

export default class UserRepository{

    async register(newVoter){
        try{
            const voter = new UserModel(newVoter);
            return await voter.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500)
        }
    }
    async isValid_AdharCardNumber(adharNumber){
        try{
            return await UserModel.findOne({adharCardNumber: adharNumber});
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500)
        }
    }
    async get_profile(adharNumber){
        try{
            return await UserModel.findOne({adharCardNumber: adharNumber}).select({_id:0, email:0, password:0, __v:0, role:0, address:0, isVoted:0})
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
    async update_password(adharNumber, Newpassword){
        try{
            const voter = await UserModel.findOne({adharCardNumber: adharNumber})
            voter.password =await Newpassword;
            return await voter.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
}
