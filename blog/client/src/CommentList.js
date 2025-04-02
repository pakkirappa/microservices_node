import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";

// export default function CommentList({ postId }) {
//   const [comments, setComments] = useState({});

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4001/posts/${postId}/comments`
//         );
//         console.log(response.data);
//         setComments(response.data);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };

//     fetchComments();
//   }, [postId]);

//   const renderComments = Object.entries(comments).map(([key, value]) => {
//     return (
//       <div className="card mb-3 shadow-sm" key={key}>
//         <div className="card-body">
//           <h5 className="card-title text-primary">{value.content}</h5>
//         </div>
//       </div>
//     );
//   });

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-4 text-center text-secondary">Comments</h1>
//       <div className="d-flex flex-row flex-wrap justify-content-start gap-3">
//         {renderComments}
//       </div>
//     </div>
//   );
// }

export default function CommentList({ comments = [] }) {
  const renderComments = comments.map((comment) => {
    return (
      <div className="card mb-3 shadow-sm" key={comment.id}>
        <div className="card-body">
          <h5 className="card-title text-primary">{comment.content}</h5>
        </div>
      </div>
    );
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center text-secondary">Comments</h1>
      <div className="d-flex flex-row flex-wrap justify-content-start gap-3">
        {renderComments}
      </div>
    </div>
  );
}
