var express = require("express");
var router = express.Router();
const Mob = require("../models/mobs");
const user = require("../models/user");

/* GET /mobs page. */
router.get("/", async function (req, res, next) {
  // Use mongoose database connection to find all mobs
  let mobs = await Mob.find().sort("name");
  res.render("mobs/index", { 
    title: "Hostile Mobs", 
    dataset: mobs,
    user: req.user 
  });
});

// Get /mobs/add - Load form for adding a new mob
router.get("/add", function (req, res, next) {
  res.render("mobs/add", { title: "Add a New Mob", user: req.user });
});

// POST /mobs/add - Save new mob to database
router.post("/add", async (req, res, next) => {
  // Use the model to create a new mob
  let newMob = new Mob({
    name: req.body.name,
    imageURL: req.body.imageURL,
    hp: req.body.hp,
    attack: req.body.attack,
    itemHeld: req.body.itemHeld,
    itemsDropped: req.body.itemsDropped,
    description: req.body.description,
    gameVersion: req.body.gameVersion,
  });
  // Save the new mob to the database
  await newMob.save();
  res.redirect("/mobs");
});

// GET /mobs/edit/:id - Load form for editing a mob
router.get("/edit/:_id", async (req, res, next) => {
  let mobID = req.params._id;
  let mobData = await Mob.findById(mobID);
  res.render("mobs/edit", { title: "Edit Mob", mob: mobData, user: req.user });
});

// POST /mobs/edit/:id - Save edited mob to database
router.post("/edit/:_id", async (req, res, next) => {
  let mobID = req.params._id;
  await Mob.findByIdAndUpdate(
    {_id: mobID},
    {
      name: req.body.name,
      imageURL: req.body.imageURL,
      hp: req.body.hp,
      attack: req.body.attack,
      itemHeld: req.body.itemHeld,
      itemsDropped: req.body.itemsDropped,
      description: req.body.description,
      gameVersion: req.body.gameVersion,
    }
  );
  await Mob.updateOne({ _id: mobID }, updatedMob);
  res.redirect("/mobs");
});

// GET /mobs/delete/:id - Delete a mob from the database
router.get("/delete/:_id", async (req, res, next) => {
  let mobID = req.params._id;
  await Mob.deleteOne({ _id: mobID });
  res.redirect("/mobs");
});

module.exports = router;
