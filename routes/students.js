const express=require('express');
const {addStudent,update,editStudent,create,destroy}=require('../controllers/StudentController');

const router=express.Router();
router.get('/add-student',addStudent);
router.post('/update/:id',update);
router.get('/edit-student/:id',editStudent);
router.post('/create',create);
router.get('/destroy/:studentId',destroy);
module.exports = router;