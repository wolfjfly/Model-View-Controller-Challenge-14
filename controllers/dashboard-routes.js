const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [ { model: User } ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts, logged_in: req.session.logged_in })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
    const postData = await Post.findOne({
        include: [{model: User}, {model: Comment}],
        where: {
            id: req.params.id
        }
    })
    const post = postData.get({plain: true})
    console.log(post)

    res.render('edit-post', { ...post, logged_in: req.session.logged_in})

    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;