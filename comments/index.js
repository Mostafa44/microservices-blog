const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { id } = req.params;
    const { content } = req.body;
    console.log(id);
    const comments = commentsByPostId[id] || [];
    comments.push({ id: commentId, content, status: 'pending' });
    commentsByPostId[id] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: id,
            status: 'pending'
        }

    });

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const event = req.body;
    console.log(' Event Recieved ', event.type);
    const { type, data } = event;
    if (type === 'CommentModerated') {
        const { id, content, postId, status } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id
        });
        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        })
    }
    res.send({});
});
app.listen(4002, () => {
    console.log("llistening on port 4002");
});