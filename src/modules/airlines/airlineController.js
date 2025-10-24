const { db } = require("../../config/database.js");

const getAirlines = async (req, res, next) => {
  try {
    const snapshot = await db.collection("airlines").get();

    const airlines = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(airlines);
  } catch (error) {
    next(error);
  }
};

// Fetch a single airline by ID
const getAirlinesById = async (req, res, next) => {
  try {
    const docRef = db.collection("airlines").doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Airline not found" });
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAirlines,
  getAirlinesById,
};
