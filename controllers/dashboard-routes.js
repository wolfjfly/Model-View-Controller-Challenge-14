const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
  Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ['id', 'post_title', 'post_body', 'date_created'],
      include: [{
          model: Comment,
          attributes: ['id', 'comment_body', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({
        plain: true
      }));
      res.render('dashboard', {
        posts,
        logged_in: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
      attributes: ['id', 'post_title', 'post_body', 'date_created'],
      include: [{
          model: Comment,
          attributes: ['id', 'comment_body', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({
          plain: true
        });
        res.render('edit', {
          post,
          logged_in: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/new', (req, res) => {
  res.render('new', {
    logged_in: true
  })
});

module.exports = router;