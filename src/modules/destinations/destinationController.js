const { db } = require("../../config/database.js");
// GET all destinations
const getDestinations = async (req, res, next) => {
  try {
    const snapshot = await db.collection("destinations").get();
    const destinations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(destinations);
  } catch (error) {
    next(error);
  }
};

// GET destinations by id
const getDestinationsById = async (req, res, next) => {
  try {
    const docRef = db.collection("destinations").doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "destinations not found" });
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDestinations,
  getDestinationsById,
};
