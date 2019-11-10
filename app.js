const express = require('express');
const bodyParser = require('body-parser');

const movieRoutes = require('./routes/movie');
const commentRoutes = require('./routes/comment');
const characterRoutes = require('./routes/character');

const app = express();

// parse application/json
app.use(bodyParser.json());

/**
* Cross site origin access
*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use('/movies/comments', commentRoutes);
app.use('/movies/characters', characterRoutes);
app.use('/movies', movieRoutes);


//Port
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));