const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/users.route')
const passport = require('passport');
const LocalStrategy = require('passport-local')
const cors = require("cors")
const User = require("./models/user.model")

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const databaseURL = process.env.DATABASE_URL || "mongodb://localhost/mmo-database2"

mongoose.connect(databaseURL);

app.use(express.json());
app.use(cors())

app.use(require('express-session')(
{
    secret: "This is a secret code!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/users", userRoute);

app.listen(5000, () =>
{
    console.log('Server init on PORT 5000')
})