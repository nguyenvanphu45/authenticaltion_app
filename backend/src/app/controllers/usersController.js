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
            const user = await User.findById(req.params.id)

            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                })
            }

            res.status(200).json({
                user: user,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },

    // [POST] /users/login
    login: async (req, res) => {
        try {
            let { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Please fill in all fields!',
                });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: 'This email does not exists!',
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Password is incorrect!',
                });
            }

            res.status(200).json({
                message: 'Login success!',
                user: user,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    // [POST] /users/register
    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Please fill in all fields!',
                });
            }

            if (!validateEmail(email)) {
                return res.status(400).json({
                    message: 'Invalid email!',
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    message: 'Password at least 6 characters!',
                });
            }

            if (!validatePassword(password)) {
                return res.status(400).json({
                    message: 'Password containt at least one uppercase, one lowercase and one number!',
                });
            }

            const findEmail = await User.findOne({ email });

            if (findEmail) {
                return res.status(400).json({
                    message: 'This email already exists',
                });
            }

            const passwordHash = await bcrypt.hash(password, 12);

            let newUser = await new User({
                email: email,
                password: passwordHash,
                name: '',
                phone: null,
                bio: '',
                image: undefined,
            });

            let user = await newUser.save();

            res.status(200).json({
                message: 'Register success!',
                user: user,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
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

            const updatedUser = await User.findByIdAndUpdate({ _id: req.params.id }, rest);

            res.status(200).json({
                message: 'Update success!',
                user: updatedUser,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = usersController;
