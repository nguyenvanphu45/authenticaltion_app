const User = require('../models/users');
const bcrypt = require('bcrypt');
const usersService = require('../services/users.service')

const usersController = {
    // [GET] /users/:id
    fineOne: async (req, res) => {
        try {
            let response = await usersService.findOne(req.params.id)
            res.status(200).json(response)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },

    // [PUT] /users/edit/:id
    update: async (req, res) => {
        try {
            let id = req.params.id
            let data = req.body;
            let response = await usersService.update(id, data);
            return res.status(200).json(response)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = usersController;
