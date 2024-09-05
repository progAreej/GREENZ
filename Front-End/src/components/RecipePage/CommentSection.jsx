// import React from 'react';

// const CommentSection = ({
//   comments,
//   handleCommentSubmit,
//   handleReplySubmit,
//   newComment,
//   setNewComment,
//   newReply,
//   setNewReply
// }) => (
//   <div>
//     <h3 className="text-xl font-semibold mb-2 text-green">Comments</h3>
//     <div className="mb-4">
//       <textarea
//         value={newComment}
//         onChange={(e) => setNewComment(e.target.value)}
//         placeholder="Write a comment..."
//         className="w-full p-2 border rounded-md"
//       />
//       <button
//         onClick={handleCommentSubmit}
//         className="mt-2 px-4 py-2 bg-green text-white rounded-md hover:bg-yellow"
//       >
//         Submit
//       </button>
//     </div>
//     <div>
//       {comments.map(comment => (
//         <div key={comment._id} className="mb-4 p-4 border rounded-md shadow-sm">
//           <p className="text-gray mb-2"><strong>{comment.userId.name}</strong> {comment.createdAt}</p>
//           <p className="text-gray mb-2">{comment.comment}</p>
//           <div>
//             <textarea
//               value={newReply[comment._id] || ''}
//               onChange={(e) => setNewReply({ ...newReply, [comment._id]: e.target.value })}
//               placeholder="Write a reply..."
//               className="w-full p-2 border rounded-md mb-2"
//             />
//             <button
//               onClick={() => handleReplySubmit(comment._id)}
//               className="px-4 py-2 bg-green text-white rounded-md hover:bg-yellow"
//             >
//               Reply
//             </button>
//             {comment.replies && comment.replies.map(reply => (
//               <div key={reply._id} className="mt-2 p-2 border-l-4 border-green">
//                 <p className="text-gray mb-2"><strong>{reply.userId.name}:</strong> {reply.reply}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default CommentSection;



import React, { useState, useEffect } from 'react';

const CommentSection = ({
  handleCommentSubmit,
  handleReplySubmit,
  newComment,
  setNewComment,
  newReply,
  setNewReply
}) => {
  const [comments, setComments] = useState([]);
  const userId = localStorage.getItem('user_id'); // Fetch user ID from localStorage or context

  useEffect(() => {
    // Fetch comments for the user
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/comments/comments/user/${userId}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [userId]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 text-green">Comments</h3>
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 px-4 py-2 bg-green text-white rounded-md hover:bg-yellow"
        >
          Submit
        </button>
      </div>
      <div>
        {comments.map(comment => (
          <div key={comment._id} className="mb-4 p-4 border rounded-md shadow-sm">
            <p className="text-gray-600 mb-2"><strong>{comment.userId.name}</strong> {new Date(comment.createdAt).toLocaleString()}</p>
            <p className="text-gray-800 mb-2">{comment.comment}</p>
            <div>
              <textarea
                value={newReply[comment._id] || ''}
                onChange={(e) => setNewReply({ ...newReply, [comment._id]: e.target.value })}
                placeholder="Write a reply..."
                className="w-full p-2 border rounded-md mb-2"
              />
              <button
                onClick={() => handleReplySubmit(comment._id)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-yellow-500"
              >
                Reply
              </button>
              {comment.replies && comment.replies.map(reply => (
                <div key={reply._id} className="mt-2 p-2 border-l-4 border-green">
                  <p className="text-gray-800 mb-2"><strong>{reply.userId.name}:</strong> {reply.reply}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
