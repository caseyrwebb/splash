const { admin, db } = require("../util/admin");
const config = require("../util/config");

//Get Boats
exports.getBoats = (req, res) => {
  db.collection("boats")
    .orderBy("boatMake", "desc")
    .get()
    .then((data) => {
      let boats = [];
      data.forEach((doc) => {
        boats.push({
          boatId: doc.id,
          boatMake: doc.data().boatMake,
          boatName: doc.data().boatName,
          boatLength: doc.data().boatLength,
          slipNumber: doc.data().slipNumber,
          boatImage: doc.data().boatImage,
          boatYear: doc.data().boatYear,
        });
      });
      return res.json(boats);
    })
    .catch((err) => console.error(err));
};

//Get particular boat
exports.boat = (req, res) => {
  let boatData = {};
  db.collection("boats")
    .where("boatName", "==", req.params.boat)
    .get()
    .then((data) => {
      boatData.boat = [];
      data.forEach((doc) => {
        boatData.boat.push({
          boatId: doc.id,
          boatMake: doc.data().boatMake,
          boatName: doc.data().boatName,
          boatLength: doc.data().boatLength,
          slipNumber: doc.data().slipNumber,
          boatImage: doc.data().boatImage,
          boatYear: doc.data().boatYear,
        });
      });
      return db
        .collection("itemsUsed")
        .where("boat", "==", req.params.boat)
        .orderBy("createdAt", "desc")
        .get();
    })
    .then((data) => {
      boatData.itemsUsed = [];
      data.forEach((doc) => {
        boatData.itemsUsed.push({
          itemId: doc.id,
          boat: doc.data().boat,
          createdAt: doc.data().createdAt,
          items: doc.data().items,
          worker: doc.data().worker,
        });
      });
      return res.json(boatData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

//Post a new boat
exports.createBoat = (req, res) => {
  const noImg = "new-boat.jpeg";
  const newBoat = {
    boatName: req.body.boatName,
    boatMake: req.body.boatMake,
    boatLength: req.body.boatLength,
    boatYear: req.body.boatYear,
    slipNumber: req.body.slipNumber,
    boatImage: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
  };

  db.collection("boats")
    .add(newBoat)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

exports.getSlips = (req, res) => {
  db.collection("slips")
    .orderBy("slipNumber", "asc")
    .get()
    .then((data) => {
      let slips = [];
      data.forEach((doc) => {
        slips.push({
          slipId: doc.id,
          boatMake: doc.data().boatMake,
          boatName: doc.data().boatName,
          boatLength: doc.data().boatLength,
          slipNumber: doc.data().slipNumber,
          occupied: doc.data().occupied,
          boatYear: doc.data().boatYear,
          boatImage: doc.data().imageUrl,
        });
      });
      return res.json(slips);
    })
    .catch((err) => console.error(err));
};

exports.createSlip = (req, res) => {
  const noImg = "no-image.png";
  const newSlip = {
    boatMake: req.body.boatMake,
    boatName: req.body.boatName,
    boatLength: req.body.boatLength,
    slipNumber: req.body.slipNumber,
    occupied: req.body.occupied,
    boatYear: req.body.boatYear,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
  };

  db.doc(`/slips/${newSlip.slipNumber}`)
    .set(newSlip)
    .then((doc) => {
      res.json({ message: `slip ${newSlip.slipNumber} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

exports.uploadBoatImage = (req, res) => {
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
        return;
        db.collection("boats")
          .where("boatName", "==", req.params.boat)
          .update({ boatImage: imageUrl });
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

exports.slipOccupied = (req, res) => {
  db.doc("/slips/6")
    .update({ occupied: false })
    .then((doc) => {
      res.json({ message: "slip updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

exports.slip5Occupied = (req, res) => {
  db.doc("/slips/5")
    .update({ occupied: true })
    .then((doc) => {
      res.json({ message: "slip updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};
