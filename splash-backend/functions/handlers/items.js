const { admin, db } = require("../util/admin");

//Post new item
exports.createItem = (req, res) => {
  const newItem = {
    item: req.body.item,
    price: req.body.price,
  };

  db.collection("materials")
    .doc(`${newItem.item}`)
    .set(newItem)
    .then((doc) => {
      res.json({ message: `document ${newItem.item} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

//Get items list
exports.getItems = (req, res) => {
  db.collection("materials")
    .get()
    .then((data) => {
      let items = [];
      data.forEach((doc) => {
        items.push({
          item: doc.data().item,
          price: doc.data().price,
        });
      });
      return res.json(items);
    })
    .catch((err) => console.error(err));
};

//Post Items used
exports.createItemsUsed = (req, res) => {
  const newItemUsed = {
    items: req.body.items,
    boat: req.body.boat,
    worker: req.body.worker,
    createdAt: new Date().toISOString(),
  };

  db.collection("itemsUsed")
    .add(newItemUsed)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};
