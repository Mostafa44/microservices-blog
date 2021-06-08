const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post("/events", (req, res) => {

});

app.listen(4004, () => {
    console.log('Listening on port 4004');
});