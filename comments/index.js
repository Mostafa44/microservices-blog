const express = require('express');
const { randomBytes } = require('crypto');
//const bodyParser = require('body-parser');

const app = express();
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { id } = req.params;
    const { content } = req.body;
    console.log(id);
    const comments = commentsByPostId[id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[id] = comments;
    res.status(201).send(comments);
});

app.listen(4002, () => {
    console.log("llistening on port 4002");
});