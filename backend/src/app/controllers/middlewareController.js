const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (req, res, next) => {
        try {
            const token = req.headers.token;
            if (token) {
                const accessToken = token.split(' ')[1];
                jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                    if (err) {
                        return res.status(404).json({ message: 'Token is not valid!' });
                    }
                    req.user = user;
                    next();
                });
            } else {
                res.status(401).json({ message: "You're not authenticated!" });
            }
        } catch (error) {
            return res.status(404).json({ msg: error.message });
        }
    },
};

module.exports = middlewareController;
