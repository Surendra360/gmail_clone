var express = require('express');
var router = express.Router();
const userModel = require("../model/userSchema");
const { sendMail } = require('../utils/sendMail');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/", async (req,res)=>{
  const email = await new userModel({...req.body})
  await email.save()
  sendMail(req,res);
  res.send("mail send successfully");
})

module.exports = router;
