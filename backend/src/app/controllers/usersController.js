const User = require('../models/users');
const bcrypt = require('bcrypt');

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

const usersController = {
    // [GET] /user/getUser
    getUser: async (req, res) => {
        console.log(req.users);
        try {
            const user = await User.findById(req.user.id);

            res.json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: err.message });
        }
    },

    // [POST] /user/login
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
            return res.status(500).json({ msg: err.message });
        }
    },

    // [POST] /user/register
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
            });

            let user = await newUser.save();

            res.status(200).json({
                message: 'Register success!',
                user: user,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = usersController;
