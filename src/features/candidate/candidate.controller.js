import ApplicationError from "./../../error/applicationError.js"
import CandidateRepository from "./candidate.repository.js"

export default class CandidateController{

    constructor(){
        this.candidateRepository = new CandidateRepository();
    }

    async createCandidate(req, res){
        try{
            if(!(await this.candidateRepository.is_Admin(req.UserID))){
                res.status(404).send("Only Admin can Add Canddidate");
            }else{
                const candidate = await this.candidateRepository.createCandidate(req.body);
                res.status(201).send(candidate);
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }

    async updateCandidate(req, res){
        try{
            if(!(await this.candidateRepository.is_Admin(req.UserID))){
                res.status(404).send("Only Admin can Update Canddidate");
            }else{
                const candidate = await this.candidateRepository.updateCandidate(req.params.candidateId ,req.body);
                res.status(201).send(candidate);
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }

    async deleteCandidate(req, res){
        try{
            if(!(await this.candidateRepository.is_Admin(req.UserID))){
                res.status(404).send("Only Admin can Delete Canddidate");
            }else{
                const candidate = await this.candidateRepository.deleteCandidate(req.params.candidateId);
                res.status(201).send("Candidate Deleted");
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
    //Candidate List
    async CandidateList(req, res){
        try{
            const list = await this.candidateRepository.List();
            console.log(list)
            res.status(200).send(list);
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
    //Vote for a specific candidate.
    async Vote_specificCandidate(req, res){
        try{
            const candidate = await this.candidateRepository.Vote(req.params.candidateId, req.UserID);
            res.status(201).send(candidate);
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }
    //Get the list of candidates sorted by their vote counts.
    async SortByCandidates_TotalVote(req, res){
        try{
            const sort_Candidate = await this.candidateRepository.Sort();
            res.status(201).send(sort_Candidate);
        }catch(err){
            console.log(err);
            throw new ApplicationError("server error! Try later!!", 500);
        }
    }

}