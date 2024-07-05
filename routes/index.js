var express = require("express");
var router = express.Router();
const emailModel = require("../model/emailSchema");
const userModel = require("../model/userSchema");
const { sendMail } = require("../utils/sendMail");
const passport = require("passport");
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

router.get("/register", (req, res, next) => {
  res.render("register", { user: req.user });
});
router.post("/register", async (req, res, next) => {
  try {
    const { name, username, phone, email, password } = req.body;
    await userModel.register({ name, username, phone, email }, password);
    res.redirect("/login");
  } catch (error) {
    res.send(error);
  }
});

router.get("/login", (req, res) => {
  res.render("login", { user: req.body });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/login",
  }),
  async (req, res, next) => {}
);

router.get("/logout", islLogedIn, async (req, res, next) => {
  req.logout(() => {
    res.redirect("/login");
  });
});

router.get("/main", islLogedIn, function (req, res, next) {
  res.render("main", { user: req.user });
});

router.post("/main", islLogedIn, async (req, res) => {
  const email = await new emailModel({ email: req.body.email });
  await email.save();
  sendMail(req, res);
  res.send("mail send successfully");
});

function islLogedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
