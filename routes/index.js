var express = require('express');
var router = express.Router();
const userModel = require("../model/userSchema");
const { sendMail } = require('../utils/sendMail');


/* GET home page. */
router.get("/", (req,res)=>{
  res.render("index")
})

router.get("/register", (req,res,next)=>{
  res.render("register")
})

router.get("/login", (req,res)=>{
  res.render("login")
})

router.get('/main', function(req, res, next) {
  res.render('main', { title: 'Express' });
});

router.post("/main", async (req,res)=>{
  const email = await new userModel({...req.body})
  await email.save()
  sendMail(req,res);
  res.send("mail send successfully");
})




module.exports = router;
