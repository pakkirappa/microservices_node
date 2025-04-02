import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommnetCreate";
import CommentList from "./CommentList";

export default function PostList() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/posts");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const renderPosts = Object.entries(posts).map(([key, value]) => {
    return (
      <div className="card mb-4 shadow-sm" key={key}>
        <div className="card-body">
          <h5 className="card-title text-primary">{value.title}</h5>
          <hr />
          <CommentCreate postId={key} />
          <CommentList postId={key} />
        </div>
      </div>
    );
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center text-secondary mb-4">Posts</h1>
      <div className="d-flex flex-row flex-wrap gap-4 justify-content-start">
        {renderPosts}
      </div>
    </div>
  );
}
