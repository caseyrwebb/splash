const { admin, db } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase");
firebase.initializeApp(config);

//Get Users
exports.getUsers = (req, res) => {
  db.collection("users")
    .orderBy("lastName", "desc")
    .get()
    .then((data) => {
      let users = [];
      data.forEach((doc) => {
        users.push({
          userId: doc.data().userId,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          userImage: doc.data().imageUrl,
          userName: doc.data().userName,
        });
      });
      return res.json(users);
    })
    .catch((err) => console.error(err));
};

//Get user with details
exports.getOneUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.params.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("itemsUsed")
          .where("worker", "==", req.params.handle)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return res.status(404).json({ errror: "User not found" });
      }
    })
    .then((data) => {
      userData.itemsUsed = [];
      data.forEach((doc) => {
        userData.itemsUsed.push({
          itemId: doc.id,
          boat: doc.data().boat,
          createdAt: doc.data().createdAt,
          items: doc.data().items,
          worker: doc.data().worker,
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

//Signup User
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  let errors = {};

  //Validate
  if (isEmpty(newUser.email)) {
    errors.email = "Must not be empty.";
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email address;";
  }

  if (isEmpty(newUser.password)) errors.password = "Must not be empty.";
  if (newUser.password !== newUser.confirmPassword)
    errors.confirmPassword = "Passwords must match.";
  if (isEmpty(newUser.firstName)) errors.firstName = "Must not be empty.";
  if (isEmpty(newUser.lastName)) errors.lastName = "Must not be empty.";
  if (isEmpty(newUser.userName)) errors.userName = "Must not be empty.";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  const noImg = "no-image.png";

  let token, userId;
  db.doc(`/users/${newUser.userName}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({
          userName: "This username is already taken, please try again.",
        });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        userName: newUser.userName,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId: userId,
        createdAt: new Date().toISOString(),
      };
      return db.doc(`/users/${newUser.userName}`).set(userCredentials);
    })
    .then((data) => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res
          .status(400)
          .json({ email: "Email is already in use, please try again." });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  let errors = {};

  if (isEmpty(user.email)) errors.email = "Must not be empty";
  if (isEmpty(user.password)) errors.password = "Must not be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ general: "Wrong email or password, please try again." });
      } else return res.status(500).json({ error: err.code });
    });
};

//Upload Image
exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        // Append token to url
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });
  busboy.end(req.rawBody);
};
