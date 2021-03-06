const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());
const events = [];
app.post('/events', async (req, res) => {
    const event = req.body;
    events.push(event);
    await axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
        console.log(err.message);
    });
    await axios.post('http://comments-srv:4002/events', event).catch((err) => {
        console.log(err.message);
    });
    await axios.post('http://query-srv:4003/events', event).catch((err) => {
        console.log(err.message);
    });
    await axios.post('http://moderation-srv:4004/events', event).catch((err) => {
        console.log(err.message);
    });
    console.log('all posts have been made');

    res.send({ status: 'OK' });
});
app.get('/events', (req, res) => {
    res.send(events);
})
app.listen(4005, () => {
    console.log('listening on Port 4005');
});
