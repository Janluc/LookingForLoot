const express = require('express');
const app = express();
const mongoose = require('./client/node_modules/mongoose');
const userRoute = require('./routes/users.route')
const passport = require('passport');
const LocalStrategy = require('./client/node_modules/passport-local/lib')
const cors = require("./client/node_modules/cors/lib")
const User = require("./models/user.model")

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const databaseURL = process.env.DATABASE_URL || "mongodb://localhost/mmo-database2"

mongoose.connect(databaseURL);

app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req, res) => 
{
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.use(express.json());
app.use(cors())

app.use(require('./client/node_modules/express-session')(
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

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
{
    console.log('Server init on ' + PORT)
})