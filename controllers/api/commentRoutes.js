const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at']

    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Comment.findByPk(
        req.params.id, {
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({
                    message: 'No comment found with this id'
                });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Create a comment
router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});



//delete a comment

router.delete('/:id', withAuth, (req, res) => {
    Comment.findByPk(
        req.params.id, {
        attributes: ['id', 'user_id']
    }).then(async comment => {
        if (!comment) {
            res.status(404).json({
                message: 'No comment found with this id!'
            });
            return;
        }
        if (req.session.user_id !== comment.user_id) {
            res.status(401).json({
                message: 'No comment found with this id!'
            });
            return;
        }
        await comment.destroy()
        res.json(comment)
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.put('/:id', withAuth, (req, res) => {
    Comment.put(req.params.id, {
        attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at'
        ],
        include: {
            model: User,
            attributes: ['username']
        },
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({
                    message: 'No comment found with this id'
                });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});



module.exports = router;