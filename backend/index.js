const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const cookies = require('cookie-parser');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
const db = require('./src/config/db');
const route = require('./src/routes');

// Connect to db
db.connect();

// HTTP logger
app.use(morgan('combined'));

app.use(cookies());

const corsOptions = {
    origin: 'http://10.10.23.32:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Routes init
route(app);

app.listen(PORT, () => {
    console.log(`Server running on port: http://10.10.23.32:${PORT}`);
});
