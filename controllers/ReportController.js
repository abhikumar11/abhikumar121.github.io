const fs = require("fs");
const path = require("path");
const Student = require("../models/student");

module.exports.viewreport=async function(req, res){
     try {
          const students=await Student.find({});
          if(!students){
              return res.send('<h1>Data Not Found</h1>');
          }
          else{
              return res.render('report',{
                    title:'Placement Report',
                    data:students
               });
          }
     } catch (error) {
          console.error(error);
     }
     return res.render('report',{
          title:"Placement Report"
     })
} 
module.exports.csvreport = async function (req, res) {
     try {
          const students = await Student.find({});
          let report =
               "Student Id, Student Name,College, Email, Status, DSA Final Score, Web Devlopment Final Score, React Final Score, Interview Date,Company,Result";
          let data = "";
          for (let stu of students) {
               data =
                    stu.id +
                    "," +
                    stu.name +
                    "," +
                    stu.college +
                    "," +
                    stu.email +
                    "," +
                    stu.placementstatus +
                    "," +
                    stu.dsascore +
                    "," +
                    stu.webdevscore +
                    "," +
                    stu.reactscore;
               if (stu.interviews.length > 0) {
                    for (let interview of stu.interviews) {
                         let ans = "";
                         ans +=
                              "," +
                              interview.date.toString() +
                              "," +
                              interview.company +
                              "," +
                              interview.result;
                         report += "\n" + data + ans;
                    }
               }
          }
          const datafile = fs.writeFile(
               "uploads/studentsReport.csv",
               report,
               function (err, data) {
                    if (err) {
                         console.log(err);
                    }
                    return res.download("uploads/PlacementReport.csv");
                     
               }
          );
     } catch (error) {
          console.log(error);
     }
};
