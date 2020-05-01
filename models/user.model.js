const mongoose = require('../client/node_modules/mongoose');
const passportLocalMongoose = require("../client/node_modules/passport-local-mongoose")

let userSchema = mongoose.Schema(
    {
    username:
    {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    password:
    {
        type: String,
        minlength: 6
    },
    profile:
    {
        description: String,
        preferredGame:{type: String},
        inGameName:{type: String,},
        gamesPlayed: [String],
        typeOfGamer:{type:String,},
        schedule:
        {
            days: String,
            hours: Number
        },
    },
    lfg: Boolean,
    image: String,
    

})
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);