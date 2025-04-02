import React from "react";
import { useState } from "react";
import axios from "axios";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4001/posts/${postId}/comments`,
        {
          content,
        }
      );
      console.log(response.data);
      setContent("");
      alert("Comment created successfully!");
    } catch (error) {
      console.error("Error creating comment:", error);
      alert("Error creating comment. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title text-center text-secondary mb-4">
            Add a New Comment
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="commentContent" className="form-label">
                Comment
              </label>
              <input
                type="text"
                id="commentContent"
                className="form-control"
                placeholder="Enter your comment here"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
