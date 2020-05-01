const app = require("express").Router();
const Game = require("../models/game.model");


app.get("/", (req, res) => {
    Game.find()
    .then(foundGames =>{
        res.json(foundGames);
    })
    .catch(err => {
        console.log(err);
        res.redirect('/')
    })
})

app.get("/:id", (req,res) => {
    Game.findById(req.params.id)
    .then(foundGame => {
        if (foundGame == null)
            throw "No Game Under that ID";   
            
        res.json(foundGame);
    })

    .catch(err => {
        console.log("No Game Under that ID");
        res.redirect("/games")
    })
})

app.post("/new", (req, res) => {
    const slugName = req.body.name.replace(/[^a-zA-Z0-9]/g,'-').replace(/-{2,}/g,'-').toLowerCase();
    const newGame =
    {
        name: req.body.name,
        slug: slugName

    }

    Game.create(newGame)
    .then(createdGame => {
        console.log(createdGame);
        res.redirect('/games')
    })
    .catch(err => {
        console.log(err)
        res.redirect('/')
    })
})

app.put("/:id/edit", (req, res) =>{
    const slugName = req.body.name.replace(/ /g, "-").toLowerCase();
    const editGame = {
        name: req.body.name,
        slug: slugName
    }

    Game.findByIdAndUpdate(req.params.id, editGame)
    .then(updatedGame => {
        
        if(updatedGame == null)
            throw "No Game Under that ID"

        res.json("edited")
    })
    .catch(err => {
        console.log(err)
        res.redirect('/games')
    })
    
})

app.delete("/:id/delete", (req, res) => {
    Game.findByIdAndDelete(req.params.id)
    .then(deletedUser => {
        if(deletedUser == null)
            throw "No game under that ID"
            
        res.json("Deleted!")
    })
    .catch(err =>{
        console.log(err)
        res.redirect(303, '/games')
    })
})

module.exports = app;