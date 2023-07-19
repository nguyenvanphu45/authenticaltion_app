const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const validateEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validatePassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Please fill in all fields!'],
            unique: true,
            match: [validateEmail, 'Email or Password incorrect!'],
        },
        password: {
            type: String,
            minlength: [6, 'Password at least 6 characters!'],
            required: [true, 'Please fill in all fields!'],
            match: [validatePassword, 'Email or Password incorrect!'],
        },
        name: {
            type: String,
        },
        phone: {
            type: String,
        },
        bio: {
            type: String,
            maxlength: 150,
            minlength: 0,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true },
);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hashSync(this.password, salt);
});

userSchema.methods.comparePassword = function(pass, callback) {
    return callback(null, bcrypt.compareSync(pass, this.password))
}

let User = mongoose.model('User', userSchema);

module.exports = User;
