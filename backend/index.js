const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
const db = require('./src/config/db');
const route = require('./src/routes');

// Connect to db
db.connect();

// HTTP logger
app.use(morgan('combined'));

const corsOptions = {
    origin: 'http://localhost:3000',
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
    console.log(`Server running on port: http://localhost:${PORT}`);
});
