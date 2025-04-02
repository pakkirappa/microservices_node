const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const events = req.body;

  const services = [
    "http://localhost:4000/events",
    "http://localhost:4001/events",
    "http://localhost:4002/events",
  ];

  await Promise.all(
    services.map((url) =>
      axios.post(url, events).catch((err) => {
        console.error(`Failed to send event to ${url}:`, err.message);
      })
    )
  );

  console.log("Event Bus: ", events);

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Event Bus is running on port 4005");
});
