const express = require('express');

const movieRoutes = require('./routes/movie');

const app = express();

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

app.use('/movies', movieRoutes);

//Port
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));