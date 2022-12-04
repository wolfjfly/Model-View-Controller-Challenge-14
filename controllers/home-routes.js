const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await Post.findAll({
      include: [{model: User}],
    });
    const posts = userData.map((project) => project.get({ plain: true }));
    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the home
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// GET all posts for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const dbpostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['user_id', 'post_title'],
        },
      ],
    });
    const posts = dbpostData.map((post) =>
      post.get({ plain: true })
    );
    res.render('homepage', {
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: [
            'id',
            'post_title',
            'post_body',
            'date_created',
          ],
        },
      ],
    });

    const posts = dbPostData.get({ plain: true });
    res.render('show_1_post', { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard/new', withAuth, (req, res) => {
  res.render('new');
});

router.get('/signup', (req, res) => {
  if(req.session.logged_in) {
      res.redirect('/');
  }
  res.render('signup');
});

router.get('/logout', async (req, res) => {
  res.render('logout');
});

module.exports = router;
