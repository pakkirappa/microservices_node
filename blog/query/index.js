const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" })); // Allow CORS from the frontend app
const posts = {};
// example: posts = {
//   "a1b2c3d4": {
//     id: "a1b2c3d4",
//     title: "Post Title",
//     comments: [
//       { id: "e5f6g7h8", content: "Comment Content" },
//       { id: "i9j0k1l2", content: "Another Comment" },
//     ],
//   },
// };

app.get("/posts", async (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const { data, type } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    if (post) {
      if (!post.comments) {
        post.comments = [];
      }
      post.comments.push({ id, content });
    }
  }
  console.log("Query Service: ", posts);
  res.send({ msg: "OK" });
});

app.listen(4002, () => {
  console.log("Server is running on port 4002");
  console.log("Visit http://localhost:4002/query to see the posts");
});
