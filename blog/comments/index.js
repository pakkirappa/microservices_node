const express = require("express");
const { randomBytes } = require("crypto");

const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" })); // Allow CORS from the frontend app

const commentsByPostId = {};

app.use(express.static("public"));

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[id] || [];

  commentsByPostId[id] = [...comments, { id: commentId, content }];
  // Send the event to the Event Bus
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: id,
    },
  });
  res.status(201).send(commentsByPostId[id]);
});

app.post("/events", async (req, res) => {
  console.log("Event received:", req.body.type);

  res.send({ status: "OK" });
});

app.listen(4001, () => {
  console.log("Server is running on port 4001");
  console.log(
    "Visit http://localhost:4001/posts/:id/comments to see the comments"
  );
});
