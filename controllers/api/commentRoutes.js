const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
try {
    const newComment = await Comment.create({
    comment_body: req.body.comment,
    user_id: req.session.user_id,
    post_id: req.body.postId
    });
    res.json(newComment);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;