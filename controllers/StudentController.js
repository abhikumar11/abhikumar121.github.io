const Student = require('../models/student');
const Interview = require('../models/interview');
module.exports.addStudent=(req,res)=>{
    if(req.isAuthenticated()){
        return res.render('addstudent',{
            title:"Add Student",
        });
    }
    return res.redirect('/');
}
module.exports.editStudent=async(req,res)=>{
    const student=await Student.findById(req.params.id);
    if(req.isAuthenticated()){
        return res.render('editstudent',{
            title:"Edit Student",
            studentdetails: student,
        });
    }
    return res.redirect('/');
}
module.exports.create=async(req,res)=>{
    try {
        const {name,email,batch,college,placementstatus,dsascore,reactscore,webdevscore} = req.body;
        Student.findOne({email},async (err, student)=>{
            if (err) {
                console.log("error in finding student");
                return;
              }
              if(!student) {
                await Student.create({name,email,batch,college,placementstatus,dsascore,reactscore,webdevscore},(err,student)=>{
                    if (err) {
                        return res.redirect("back");
                      }
                      return res.redirect("back");
                    }
                );
              }
              else{
                return res.redirect("back");
              }
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports.destroy=async(req,res)=>{
    try {
        const {studentId}=req.params;
        const student=await Student.findById(studentId);
        if(!student){
            return;
        }
        const interview = student.interviews;
        if(interview.length>0){
            for (let inter of interview) {
                await Interview.findOneAndUpdate(
                  { company: inter.company },
                  { $pull: { students: { student: studentId } } }
                );
              }
        }
        student.remove();
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return;
    }
}
module.exports.update = async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      const {
        name,
        college,
        batch,
        dsascore,
        reactscore,
        webdevscore,
        placementstatus,
      } = req.body;
  
      if (!student) {
        return res.redirect("back");
      }
  
      student.name = name;
      student.college = college;
      student.batch = batch;
      student.dsascore = dsascore;
      student.reactscore = reactscore;
      student.webdevscore = webdevscore;
      student.placementstatus = placementstatus;
  
      student.save();
      return res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
      return res.redirect("back");
    }
  };