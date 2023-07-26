const Chat = require('../models/chats');
const User = require('../models/users');

const chatService = {
    fetchChat: (id) => {
        return new Promise((resolve, reject) => {
            try {
                Chat.find({ users: { $elemMatch: { $eq: id } } })
                    .populate('users', '-password')
                    .populate('groupAdmin', '-password')
                    .populate('latestMessage')
                    .sort({ updateAt: -1 })
                    .then(async (results) => {
                        results = await User.populate(results, {
                            path: 'latestMessage.sender',
                            select: 'name description pic',
                        });
                        resolve(results);
                    });
            } catch (e) {
                reject(e);
            }
        });
    },
    create: (data, admin) => {
        return new Promise(async (resolve, reject) => {
            try {
                let users = JSON.parse(data.users);

                users.push(admin.id);

                const groupChat = await Chat.create({
                    name: data.name,
                    description: data.description,
                    users: users,
                    groupAdmin: admin.id,
                });

                const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
                    .populate('users', '-password')
                    .populate('groupAdmin', '-password');

                resolve(fullGroupChat);
            } catch (e) {
                reject(e);
            }
        });
    },
};

module.exports = chatService;
