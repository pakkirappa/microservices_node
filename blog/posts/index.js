const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // Allow CORS from the frontend app
// app.use(express.urlencoded({ extended: true }));

const posts = {};

app.use(express.static("public"));

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  // id is a random 4-byte hex string example: "a1b2c3d4"
  const { title } = req.body;

  posts[id] = { id, title };
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});

app.post("/events", async (req, res) => {
  console.log("Event received:", req.body.type);
  res.send({ status: "OK" });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
  console.log("Visit http://localhost:4000/posts to see the posts");
});
