const { admin, db } = require("./util/admin");
const config = require("./util/config");
const FBAuth = require("./util/fbAuth");
const functions = require("firebase-functions");
const express = require("express");

const app = express();

const {
  getUsers,
  signup,
  login,
  uploadImage,
  getOneUser,
} = require("./handlers/users");
const {
  getBoats,
  boat,
  createBoat,
  getSlips,
  createSlip,
  uploadBoatImage,
  slipOccupied,
  slip5Occupied,
} = require("./handlers/boats");
const { createItem, getItems, createItemsUsed } = require("./handlers/items");

//User Routes
app.get("/users", getUsers);
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.get("/user/:handle", getOneUser);

//Boat Routes
app.get("/boats", getBoats);
app.get("/boat/:boat", boat);
app.post("/createBoat", createBoat);
app.get("/slips", getSlips);
app.post("/createSlip", createSlip);
app.post("/image/:boat", uploadBoatImage);
app.post("/slipOccupied", slipOccupied);
app.post("/slip5Occupied", slip5Occupied);

//Items Routes
app.post("/createItem", createItem);
app.get("/items", getItems);
app.post("/createItemsUsed", createItemsUsed);

exports.api = functions.https.onRequest(app);
