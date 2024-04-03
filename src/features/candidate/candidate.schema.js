import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    party:{
        type: String,
        required:true,
    },
    age:{
        type: String,
        required: true,
    },
    votes:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId, //mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
            voteAt:{
                type: Date,
                default: Date.now(),
            }
        }
    ],
    totalVote:{
        type: Number,
        default: 0,
    }
});

export default CandidateSchema;