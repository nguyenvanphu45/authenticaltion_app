const Chat = require('../models/chats');

const chatService = {
    findAllGroup: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let chats = await Chat.find()

                resolve(chats)
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
