const express=require('express');
const router=express.Router();
const {addInterview,create,enrollInterview,deallocate}=require('../controllers/InterviewController');
router.post('/create',create);
router.get('/add-interview',addInterview);
router.post("/enroll-in-interview/:id", enrollInterview);
router.get("/deallocate/:studentId/:interviewId", deallocate);
module.exports = router;