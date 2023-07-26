const chatService = require('../services/chat.service');

const chatController = {
    // [GET] /chat/ 
    findAllGroup: async (req, res) => {
        try {
            let response = await chatService.findAllGroup();

            res.status(200).json(response);
        } catch (error) {
            if (error.name === 'ValidationError') {
                let err = Object.values(error.errors)
                    .map((val) => val.message)
                    .join('');
                return res.status(500).json({ msg: err });
            }
            res.status(500).json({ msg: error.message });
        }
    },

    // [POST] /chat/create
    create: async (req, res) => {
        try {
            let data = req.body;
            let response = await chatService.create(data, req.user);

            res.status(200).json(response);
        } catch (error) {
            if (error.name === 'ValidationError') {
                let err = Object.values(error.errors)
                    .map((val) => val.message)
                    .join('');
                return res.status(500).json({ msg: err });
            }
            res.status(500).json({ msg: error.message });
        }
    },

    // [GET] /chat/member
    fetchMember: async (req, res) => {
        try {
            let response = await chatService.fetchMember(req.user._id)
            res.status(200).json(response)
        } catch (error) {
            if (error.name === 'ValidationError') {
                let err = Object.values(error.errors)
                    .map((val) => val.message)
                    .join('');
                return res.status(500).json({ msg: err });
            }
            res.status(500).json({ msg: error.message });
        }
    }
};

module.exports = chatController;
