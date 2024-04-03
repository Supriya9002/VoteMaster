import ApplicationError from "./../../error/applicationError.js"
import mongoose from "mongoose";
import CandidateSchema from "./candidate.schema.js"
import UserSchema from "../user/user.schema.js";

//model
const CandidateModel = mongoose.model("Candidate", CandidateSchema);
const UserModel = mongoose.model("user", UserSchema);

export default class CandidateRepository{

    async is_Admin(userId){
        try{
            console.log("Userid:", userId);
            return await UserModel.findOne({_id: userId, role: "Admin"});
        
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }

    async createCandidate(newCandidate){
        try{
            const candidate = new CandidateModel(newCandidate);
            return await candidate.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }

    async updateCandidate(candidateId, bodyData){
        try{
            const candidate = await CandidateModel.findOne({_id: candidateId});
            console.log(candidate);
            if(!candidate){
                return "Cndidate ID Invalid"
            }else{
                if(bodyData.name){
                    candidate.name = bodyData.name;
                }
                if(bodyData.party){
                    candidate.party = bodyData.party;
                }
                if(bodyData.age){
                    candidate.age = bodyData.age;
                }
                return await candidate.save();
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }

    async deleteCandidate(candidateId){
        try{
            return await CandidateModel.findByIdAndDelete(candidateId);
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
    //Candidate List
    async List(){
        try{
            return await CandidateModel.find().select({_id:0, totalVote:0, votes:0, __v:0});
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
    //Vote for a specific candidate.
    async Vote(candidateId, userId){
        try{
            console.log("CardId and UserId", candidateId, userId);
            const user = await this.is_Admin(userId);
            if(user){
                return "You Can not Given Vote, BCZ Hare Your Role is Admin"
            }
            const voter = await UserModel.findOne({_id: userId});
            if(voter.isVoted == true){
                return "User Already Given Vote"
            }
            const candidate = await CandidateModel.findOne({_id: candidateId})
            if(!candidate){
                return "Candidate ID Invalid"
            }
            candidate.votes.push({user: new mongoose.Types.ObjectId(userId)})
            candidate.totalVote += 1;
            await candidate.save();
            voter.isVoted = true;
            await voter.save();
            return candidate;
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
    //Get the list of candidates sorted by their vote counts.
    async Sort(){
        try{
            const candidate = await CandidateModel.find().select({votes:0, __v:0, _id:0});
            //console.log(candidate);
            candidate.sort((a,b)=> b.totalVote - a.totalVote);
            return candidate;
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
}