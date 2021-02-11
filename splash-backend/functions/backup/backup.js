// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
//
// admin.initializeApp();
//
// const config = {
//   apiKey: "AIzaSyAQDc0OWO6eLlJrmkLgincH2qupc8pfOvU",
//   authDomain: "splash-9385c.firebaseapp.com",
//   databaseURL: "https://splash-9385c.firebaseio.com",
//   projectId: "splash-9385c",
//   storageBucket: "splash-9385c.appspot.com",
//   messagingSenderId: "425476084381",
//   appId: "1:425476084381:web:4d85ac0c0f7c2a07ecfa74",
//   measurementId: "G-V5LSDQ09S2",
// };
//
// const express = require("express");
// const app = express();
//
// const firebase = require("firebase");
// firebase.initializeApp(config);
//
// const db = admin.firestore();
//
// app.get("/timesIn", (req, res) => {
//   db.collection("timeIn")
//     .orderBy("createdAt", "desc")
//     .get()
//     .then((data) => {
//       let timesIn = [];
//       data.forEach((doc) => {
//         timesIn.push({
//           timeInId: doc.id,
//           user: doc.data().user,
//           timeIn: doc.data().timeIn,
//           createdAt: doc.data().createdAt,
//         });
//       });
//       return res.json(timesIn);
//     })
//     .catch((err) => console.error(err));
// });
//
// app.get("/users", (req, res) => {
//   db.collection("users")
//     .orderBy("lastName", "desc")
//     .get()
//     .then((data) => {
//       let users = [];
//       data.forEach((doc) => {
//         users.push({
//           userId: doc.data().userId,
//           firstName: doc.data().firstName,
//           lastName: doc.data().lastName,
//         });
//       });
//       return res.json(users);
//     })
//     .catch((err) => console.error(err));
// });
//
// app.get("/boats", (req, res) => {
//   db.collection("boats")
//     .orderBy("boatMake", "desc")
//     .get()
//     .then((data) => {
//       let boats = [];
//       data.forEach((doc) => {
//         boats.push({
//           boatId: doc.id,
//           boatMake: doc.data().boatMake,
//           boatName: doc.data().boatName,
//           boatLength: doc.data().boatLength,
//           slipNumber: doc.data().slipNumber,
//         });
//       });
//       return res.json(boats);
//     })
//     .catch((err) => console.error(err));
// });
//
// app.post("/createTimeIn", (req, res) => {
//   const newTimeIn = {
//     user: req.body.user,
//     timeIn: db.Timestamp.fromDate(new Date()),
//     createdAt: new Date().toISOString(),
//   };
//
//   db.collection("timeIn")
//     .add(newTimeIn)
//     .then((doc) => {
//       res.json({ message: `document ${doc.id} created successfully` });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "something went wrong" });
//       console.error(err);
//     });
// });
//
// app.post("/createBoat", (req, res) => {
//   const newBoat = {
//     boatName: req.body.boatName,
//     boatMake: req.body.boatMake,
//     boatLength: req.body.boatLength,
//     slipNumber: req.body.slipNumber,
//   };
//
//   db.collection("boats")
//     .add(newBoat)
//     .then((doc) => {
//       res.json({ message: `document ${doc.id} created successfully` });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "something went wrong" });
//       console.error(err);
//     });
// });
//
// const isEmpty = (string) => {
//   if (string.trim() === "") return true;
//   else return false;
// };
//
// const isEmail = (email) => {
//   const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (email.match(regEx)) return true;
//   else return false;
// };
//
// app.post("/signup", (req, res) => {
//   const newUser = {
//     email: req.body.email,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     userName: req.body.userName,
//     password: req.body.password,
//     confirmPassword: req.body.confirmPassword,
//   };
//
//   let errors = {};
//
//   if (isEmpty(newUser.email)) {
//     errors.email = "Must not be empty.";
//   } else if (!isEmail(newUser.email)) {
//     errors.email = "Must be a valid email address;";
//   }
//
//   if (isEmpty(newUser.password)) errors.password = "Must not be empty.";
//   if (newUser.password !== newUser.confirmPassword)
//     errors.confirmPassword = "Passwords must match.";
//   if (isEmpty(newUser.firstName)) errors.firstName = "Must not be empty.";
//   if (isEmpty(newUser.lastName)) errors.lastName = "Must not be empty.";
//   if (isEmpty(newUser.userName)) errors.userName = "Must not be empty.";
//
//   if (Object.keys(errors).length > 0) return res.status(400).json(errors);
//   //Validate
//   let token, userId;
//   db.doc(`/users/${newUser.userName}`)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         return res.status(400).json({
//           userName: "This username is already taken, please try again.",
//         });
//       } else {
//         return firebase
//           .auth()
//           .createUserWithEmailAndPassword(newUser.email, newUser.password);
//       }
//     })
//     .then((data) => {
//       userId = data.user.uid;
//       return data.user.getIdToken();
//     })
//     .then((idToken) => {
//       token = idToken;
//       const userCredentials = {
//         email: newUser.email,
//         firstName: newUser.firstName,
//         lastName: newUser.lastName,
//         userName: newUser.userName,
//         userId: userId,
//         createdAt: new Date().toISOString(),
//       };
//       return db.doc(`/users/${newUser.userName}`).set(userCredentials);
//     })
//     .then((data) => {
//       return res.status(201).json({ token });
//     })
//     .catch((err) => {
//       console.error(err);
//       if (err.code === "auth/email-already-in-use") {
//         return res
//           .status(400)
//           .json({ email: "Email is already in use, please try again." });
//       } else {
//         return res.status(500).json({ error: err.code });
//       }
//     });
// });
//
// app.post("/login", (req, res) => {
//   const user = {
//     email: req.body.email,
//     password: req.body.password,
//   };
//
//   let errors = {};
//
//   if (isEmpty(user.email)) errors.email = "Must not be empty";
//   if (isEmpty(user.password)) errors.password = "Must not be empty";
//
//   if (Object.keys(errors).length > 0) return res.status(400).json(errors);
//
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(user.email, user.password)
//     .then((data) => {
//       return data.user.getIdToken();
//     })
//     .then((token) => {
//       return res.json({ token });
//     })
//     .catch((err) => {
//       console.error(err);
//       if (err.code === "auth/wrong-password") {
//         return res
//           .status(403)
//           .json({ general: "Wrong email or password, please try again." });
//       } else return res.status(500).json({ error: err.code });
//     });
// });
//
// //Create Item
// app.post("/createItem", (req, res) => {
//   const newItem = {
//     item: req.body.item,
//   };
//
//   db.collection("materials")
//     .doc(`${newItem.item}`)
//     .set(newItem)
//     .then((doc) => {
//       res.json({ message: `document ${newItem.item} created successfully` });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "something went wrong" });
//       console.error(err);
//     });
// });
//
// app.get("/items", (req, res) => {
//   db.collection("materials")
//     .get()
//     .then((data) => {
//       let items = [];
//       data.forEach((doc) => {
//         items.push(doc.data().item);
//       });
//       return res.json(items);
//     })
//     .catch((err) => console.error(err));
// });
//
// // {
// // "items": {
// //     "sandpaper 40": "4",
// //     "roller": "3",
// //     "sandpaper 80": "9"
// // },
// // "user": "user"
// // }
//
// app.post("/createItemsUsed", (req, res) => {
//   const newItemUsed = {
//     items: req.body.items,
//     user: req.body.user,
//     createdAt: new Date().toISOString(),
//   };
//
//   db.collection("itemsUsed")
//     .add(newItemUsed)
//     .then((doc) => {
//       res.json({ message: `document ${doc.id} created successfully` });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "something went wrong" });
//       console.error(err);
//     });
// });
//
// exports.api = functions.https.onRequest(app);
