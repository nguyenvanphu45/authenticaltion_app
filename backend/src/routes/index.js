const usersRoute = require('./users');
const authRoute = require('./auth');

function route(app) {
    app.use('/users', usersRoute);
    app.use('/auth', authRoute);

    app.use('/', (req, res) => res.send('API not available!!'));
}

module.exports = route;
