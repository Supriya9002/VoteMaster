import express from "express"
import CandidateController from "./candidate.controller.js"
import jwtAuth from "../../middleware/jwt.middleware.js"

const CandidateRouter = express.Router();
const candidateController = new CandidateController(); 

CandidateRouter.post("/",jwtAuth, (req, res)=>{
    candidateController.createCandidate(req, res);
})
CandidateRouter.put("/:candidateId",jwtAuth, (req, res)=>{
    candidateController.updateCandidate(req, res);
})
CandidateRouter.delete("/:candidateId",jwtAuth, (req, res)=>{
    candidateController.deleteCandidate(req, res);
})
CandidateRouter.get("/",jwtAuth, (req, res)=>{
    candidateController.CandidateList(req, res);
})
CandidateRouter.post("/vote/:candidateId",jwtAuth, (req, res)=>{
    candidateController.Vote_specificCandidate(req, res);
})
CandidateRouter.get("/vote/counts",jwtAuth, (req, res)=>{
    candidateController.SortByCandidates_TotalVote(req, res);
})


export default CandidateRouter;