const router = require("express").Router();
const { User } = require("../../models");

// CREATE new user
router.post("/signup", async (req, res) => {
  try {
    const mvc_db = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = mvc_db.id;
      req.session.username = mvc_db.username;
      req.session.logged_in = true;
      res.status(200).json({ message: "User successfully created!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userdb = await User.findOne({
      where: { username: req.body.username },});
      
    if (!userdb) {
      res
      console.log('no username')
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    const validPassword = await userdb.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userdb.id;
      req.session.logged_in = true;
      res.json({ user: userdb, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
