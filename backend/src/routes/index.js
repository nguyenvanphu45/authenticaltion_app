const usersRoute = require('./users');

function route(app) {
    app.use('/users', usersRoute);

    app.use('/', (req, res) => res.send('API not available!!'))
}

module.exports = route;
