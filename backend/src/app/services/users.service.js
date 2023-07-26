const User = require('../models/users');
const bcrypt = require('bcrypt');

const usersService = {
    findAll: (keyword, user) => {
        return new Promise(async (resolve, reject) => {
            try {
                let users = await User.find(keyword)
                    .find({ _id: { $ne: user } })
                    .limit(5);

                resolve({
                    users: users,
                });
            } catch (e) {
                reject(e);
            }
        });
    },
    findUserByKeyword: () => {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (e) {
                reject(e);
            }
        });
    },
    findOne: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(id);

                if (!user) {
                    return res.status(400).json({
                        message: 'User not found',
                    });
                }

                resolve({
                    user: user,
                });
            } catch (e) {
                reject(e);
            }
        });
    },
    update: (id, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { password, ...rest } = data;

                if (password) {
                    const passwordHash = await bcrypt.hash(password, 12);
                    data.password = passwordHash;
                }

                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    { $set: { password: data.password }, ...rest },
                    { new: true },
                );

                resolve({
                    message: 'Update success!',
                    user: updatedUser,
                });
            } catch (e) {
                reject(e);
            }
        });
    },
};

module.exports = usersService;
