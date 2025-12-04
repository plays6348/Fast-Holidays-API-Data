const { db } = require("../../config/database.js");

const searchFlights = async (req, res, next) => {
  try {
    const { departure, destination } = req.params;

    if (!departure || !destination) {
      return res
        .status(400)
        .json({ message: "Please provide both departure and destination." });
    }

    // ✅ Fetch all fares first (or filter fares collection if stored with routes)
    const fareSnapshot = await db.collection("fares").get();
    const fares = fareSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // ✅ Match fares where departure & destination match
    const matchedFares = fares?.filter(
      (fare) =>
        fare?.destCountry?.code?.toLowerCase() === departure.toLowerCase() &&
        fare?.deptCountry?.code?.toLowerCase() === destination.toLowerCase()
    );

    if (matchedFares.length === 0) {
      return res.status(404).json({ message: "No matching flights found." });
    }

    // ✅ Optionally get related airline & destination data
    const airlinesSnapshot = await db.collection("airlines").get();
    const airlines = airlinesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const destinationsSnapshot = await db.collection("destinations").get();
    const destinations = destinationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // ✅ Enrich each fare with airline & destination info
    const enrichedResults = matchedFares.map((fare) => {
      const airline = airlines.find((a) => a.airlineCode === fare.airlineCode);
      const departureCity = destinations.find((d) => d.code === fare.departure);
      const destinationCity = destinations.find(
        (d) => d.code === fare.airlineCode
      );

      return {
        ...fare,
        airline: airline || null,
        departureDetails: departureCity || null,
        destinationDetails: destinationCity || null,
      };
    });

    res.status(200).json({
      success: true,
      count: enrichedResults.length,
      data: enrichedResults,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { searchFlights };
