const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
    const event = req.body;

    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4002/events', event);
    await axios.post('http://localhost:4003/events', event);

    console.log('all posts have been made');

    res.send({ status: 'OK' });
});

app.listen(4005, () => {
    console.log('listening on Port 4005');
});
