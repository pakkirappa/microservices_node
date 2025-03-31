import React, { useState } from "react";
import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/posts", {
        title,
      });
      console.log(response.data);
      setTitle("");
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title text-center text-secondary mb-4">
            Create a New Post
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="postTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="postTitle"
                className="form-control"
                placeholder="Enter post title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
