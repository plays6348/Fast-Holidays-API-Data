const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");
const airlineRoutes = require("./modules/airlines/airlineRoute.js");
const destinationRoutes = require("./modules/destinations/destinationRoute.js");
const fareRoutes = require("./modules/fares/fareRoute.js");
const searchRoutes = require("./modules/searchRecords/searchRoute.js");
const { connectToDatabase } = require("./config/database.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is Running.");
});

app.use("/airlines", airlineRoutes);
app.use("/destinations", destinationRoutes);
app.use("/fares", fareRoutes);
app.use("/search", searchRoutes);
app.use(errorHandler);

// ✅ Start server only after Firestore connects
(async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Server not started due to Firestore error.");
  }
})();
