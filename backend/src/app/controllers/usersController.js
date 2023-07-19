const User = require('../models/users');
const bcrypt = require('bcrypt');

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    return re.test(password);
}

const usersController = {
    // [GET] /users/:id
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                return res.status(400).json({
                    message: 'User not found',
                });
            }

            res.status(200).json({
                user: user,
            });
        } catch (error) {
            console.log(error);
            return res.status(404).json({ msg: error.message });
        }
    },

    // [PUT] /users/edit/:id
    update: async (req, res) => {
        try {
            const { password, ...rest } = req.body;

            if (password) {
                const passwordHash = await bcrypt.hash(password, 12);
                res.password = passwordHash;
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: { password: res.password }, ...rest },
                { new: true },
            );

            res.status(200).json({
                message: 'Update success!',
                user: updatedUser,
            });
        } catch (error) {
            console.log(error);
            return res.status(404).json({ msg: error.message });
        }
    },
};

module.exports = usersController;
