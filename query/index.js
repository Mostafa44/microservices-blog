const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/events', (req, res) => {

});

app.get('/posts', (req, res) => {

});

app.listen(4003, () => {
    console.log('Listening on port 4003');
});
