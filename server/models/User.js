const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, "First name is required"]
    },

    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },

    email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Invalid email"
      }
      
      
    },

    password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
    }

},{timestamps: true});

UserSchema.virtual('confirmPass')
    .get(() => this._confirmPass)
    .set( value => this._confirmPass = value);

UserSchema.pre("validate", function(next) {
    if(this.password !== this.confirmPass){
        this.invalidate('confirmPass', 'Passwords must match!');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model("User", UserSchema);