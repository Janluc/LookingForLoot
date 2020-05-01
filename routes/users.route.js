const app = require("express").Router();
const User = require("../models/user.model");
const passport = require("passport")


app.get("/", (req, res) => 
{
    User.find()
    .then(foundUsers => res.status(200).json(foundUsers))
    .catch(err => res.redirect('/'))
})


app.post("/new", (req, res) => 
{
    const newUser = new User(
    {
        username: req.body.username,
        profile: 
        {
            description: req.body.description,
            typeOfGamer: req.body.typeOfGamer,
        },
        lfg: false
    })

    User.register(newUser, req.body.password, (err, user) => 
    {
        if (err)
            res.status(401).json("fail")

        passport.authenticate("local")(req, res, () => res.status(200).json(req.user));
    });

});

app.post('/login', passport.authenticate('local'), (req, res) => res.status(200).json(req.user));


app.get("/logout", (req, res) => 
{
    req.logout();
    res.status(200).json("logged out")
})


app.put("/edit/:id", (req, res) =>
{ 
    const editUser = 
    {
        lfg: req.body.lfg,
        profile: 
        {
            description: req.body.description,
            preferredGame: req.body.preferredGame,
            inGameName: req.body.inGameName,
            typeOfGamer: req.body.typeOfGamer,
            
        },
        
    }

    User.findByIdAndUpdate(req.params.id, editUser)
    .then(updatedUser => res.status(200).json("edited"))
    .catch(err => 
    {
        console.log(err)
        res.redirect('/users/' + req.params.id)
    })
    
})

app.delete("/delete/:id", (req, res) => 
{
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted!"))
    .catch(err =>
    {
        console.log(err)
        res.redirect('/users')
    })
})

app.get("/:id", (req,res) => 
{
    User.findById(req.params.id)
    .then(foundUser => res.status(200).json(foundUser))
    .catch(err => 
    {
        console.log(err);
        res.status(200).json("error finding user")
    })
})


module.exports = app;