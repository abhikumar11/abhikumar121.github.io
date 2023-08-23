const express=require("express");
const passport=require("passport");
const {dashboard}=require('../controllers/DashboardController');
const {csvreport,viewreport}=require('../controllers/ReportController');
const{profile,updateUser,signIn,signUp,create,createSession,destroySession}=require('../controllers/UserController');

const router=express.Router();
router.get("/profile", passport.checkAuthentication, profile);
router.post("/update", passport.checkAuthentication, updateUser);
router.get("/dashboard", dashboard);
router.get("/", signIn);
router.get("/sign-up", signUp);
router.post("/create", create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  createSession
);
router.get("/sign-out", destroySession);
router.get("/report",viewreport);
router.get("/download", csvreport);
module.exports=router;