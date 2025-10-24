const { db } = require("../../config/database.js");

// GET all fares
const getFares = async (req, res, next) => {
  try {
    const snapshot = await db.collection("fares").get();
    const fares = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(fares);
  } catch (error) {
    next(error);
  }
};

// GET fares by id
const getFaresById = async (req, res, next) => {
  try {
    const docRef = db.collection("fares").doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "fares not found" });
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFares,
  getFaresById,
};
