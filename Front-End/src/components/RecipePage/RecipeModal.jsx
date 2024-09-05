


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaUtensils, FaGlobeAmericas, FaClock, FaShareAlt } from 'react-icons/fa';
// import CommentSection from './CommentSection';
// import axios from 'axios';

// const RecipeModal = ({ recipe, closeRecipeDetails }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [newReply, setNewReply] = useState({});
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     if (storedUserId) {
//       setUserId(storedUserId);
//     }

//     axios.get(`http://localhost:5000/api/comments/target/${recipe._id}`)
//       .then(response => setComments(response.data))
//       .catch(error => console.error('Error fetching comments:', error));
//   }, [recipe._id]);

//   const handleCommentSubmit = () => {
//     if (!newComment.trim() || !userId) return;

//     const commentData = {
//       userId,
//       type: 'recipe',
//       targetId: recipe._id,
//       comment: newComment,
//     };

//     axios.post('http://localhost:5000/api/comments', commentData)
//       .then(response => {
//         setComments([response.data, ...comments]);
//         setNewComment('');
//       })
//       .catch(error => console.error('Error posting comment:', error));
//   };

//   const handleReplySubmit = (commentId) => {
//     if (!newReply[commentId]?.trim() || !userId) return;

//     const replyData = {
//       userId,
//       reply: newReply[commentId],
//     };

//     axios.post(`http://localhost:5000/api/comments/${commentId}/replies`, replyData)
//       .then(response => {
//         setComments(comments.map(comment =>
//           comment._id === commentId ? response.data : comment
//         ));
//         setNewReply({ ...newReply, [commentId]: '' });
//       })
//       .catch(error => console.error('Error posting reply:', error));
//   };

//   const handleShare = () => {
//     const shareData = {
//       title: recipe.name,
//       text: `${recipe.name} - ${recipe.category}: ${recipe.instructions.join(' ')}`,
//       url: window.location.href,
//     };

//     if (navigator.share) {
//       navigator.share(shareData)
//         .then(() => console.log('Thanks for sharing!'))
//         .catch((error) => console.log('Error sharing:', error));
//     } else {
//       alert('Sharing is not supported in this browser.');
//     }
//   };

//   return (
//     <motion.div
//       className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
//       onClick={closeRecipeDetails}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <div
//         className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={closeRecipeDetails}
//           className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//         >
//           ×
//         </button>
//         <div className="mb-4">
//           <img
//             src={recipe.photos[0]} // Assuming recipe.image holds the URL to the recipe image
//             alt={recipe.name}
//             className="w-full h-64 object-cover rounded-md mb-4"
//           />
//         </div>
//         <div className="flex justify-between items-start mb-4">
//           <h2 className="text-2xl font-bold text-green">{recipe.name}</h2>
//           <button onClick={handleShare} className="text-blue-500 hover:text-blue-700">
//             <FaShareAlt className="text-xl" />
//           </button>
//         </div>
//         <div className="flex items-center mb-4 text-gray-700">
//           <FaUtensils className="mr-2" /> {recipe.category}
//           <FaGlobeAmericas className="ml-4 mr-2" /> {recipe.cuisine}
//           <FaClock className="ml-4 mr-2" /> {recipe.cookingTime} minutes
//         </div>
//         <div className="mb-4">
//           <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
//           <ul className="list-disc ml-6 space-y-1">
//             {recipe.ingredients.map((ingredient, index) => (
//               <li key={index}>{ingredient}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="mb-4">
//           <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
//           <ol className="list-decimal ml-6 space-y-2">
//             {recipe.instructions.map((instruction, index) => (
//               <li key={index}>{instruction}</li>
//             ))}
//           </ol>
//         </div>

//         <CommentSection
//           comments={comments}
//           handleCommentSubmit={handleCommentSubmit}
//           handleReplySubmit={handleReplySubmit}
//           newComment={newComment}
//           setNewComment={setNewComment}
//           newReply={newReply}
//           setNewReply={setNewReply}
//         />
//       </div>
//     </motion.div>
//   );
// };

// export default RecipeModal;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaUtensils, FaGlobeAmericas, FaClock, FaShareAlt } from 'react-icons/fa';
// import CommentSection from './CommentSection';
// import axios from 'axios';

// const RecipeModal = ({ recipe, closeRecipeDetails }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [newReply, setNewReply] = useState({});
//   const [userId, setUserId] = useState(null);
//   const [users, setUsers] = useState([]); // List of users for sharing
//   const [selectedUser, setSelectedUser] = useState(''); // User selected for sharing
//   const [shareMessage, setShareMessage] = useState(''); // Custom message for sharing

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     if (storedUserId) {
//       setUserId(storedUserId);
//     }

//     axios.get(`http://localhost:5000/api/comments/target/${recipe._id}`)
//       .then(response => setComments(response.data))
//       .catch(error => console.error('Error fetching comments:', error));

//     // Fetch users for sharing
//     axios.get('http://localhost:5000/api/recipeSharing/users') // Assuming the endpoint exists to get the user list
//       .then(response => setUsers(response.data))
//       .catch(error => console.error('Error fetching users:', error));
//   }, [recipe._id]);

//   const handleCommentSubmit = () => {
//     if (!newComment.trim() || !userId) return;

//     const commentData = {
//       userId,
//       type: 'recipe',
//       targetId: recipe._id,
//       comment: newComment,
//     };

//     axios.post('http://localhost:5000/api/comments', commentData)
//       .then(response => {
//         setComments([response.data, ...comments]);
//         setNewComment('');
//       })
//       .catch(error => console.error('Error posting comment:', error));
//   };

//   const handleReplySubmit = (commentId) => {
//     if (!newReply[commentId]?.trim() || !userId) return;

//     const replyData = {
//       userId,
//       reply: newReply[commentId],
//     };

//     axios.post(`http://localhost:5000/api/comments/${commentId}/replies`, replyData)
//       .then(response => {
//         setComments(comments.map(comment =>
//           comment._id === commentId ? response.data : comment
//         ));
//         setNewReply({ ...newReply, [commentId]: '' });
//       })
//       .catch(error => console.error('Error posting reply:', error));
//   };

//   const handleShare = () => {
//     if (!selectedUser) {
//       alert('Please select a user to share with.');
//       return;
//     }

//     const shareData = {
//       recipeId: recipe._id,
//       sharedWith: selectedUser,
//       message: shareMessage,
//     };

//     axios.post('http://localhost:5000/api/recipeSharing', shareData)
//       .then(() => {
//         alert('Recipe shared successfully!');
//       })
//       .catch(error => {
//         console.error('Error sharing recipe:', error);
//         alert('Failed to share the recipe.');
//       });
//   };

//   return (
//     <motion.div
//       className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
//       onClick={closeRecipeDetails}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <div
//         className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={closeRecipeDetails}
//           className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//         >
//           ×
//         </button>
//         <div className="mb-4">
//           <img
//             src={recipe.photos[0]} // Assuming recipe.image holds the URL to the recipe image
//             alt={recipe.name}
//             className="w-full h-64 object-cover rounded-md mb-4"
//           />
//         </div>
//         <div className="flex justify-between items-start mb-4">
//           <h2 className="text-2xl font-bold text-green">{recipe.name}</h2>
//           {/* Share Button */}
//           <div>
//             <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={handleShare}>
//               <FaShareAlt className="text-xl" />
//             </button>
//             <select
//               className="border p-1 rounded"
//               value={selectedUser}
//               onChange={(e) => setSelectedUser(e.target.value)}
//             >
//               <option value="">Select User to Share With</option>
//               {users.map(user => (
//                 <option key={user._id} value={user._id}>
//                   {user.name} ({user.email})
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         {/* Share Message */}
//         <textarea
//           className="w-full p-2 border rounded mb-4"
//           placeholder="Add a message for the user..."
//           value={shareMessage}
//           onChange={(e) => setShareMessage(e.target.value)}
//         />
//         <div className="flex items-center mb-4 text-gray-700">
//           <FaUtensils className="mr-2" /> {recipe.category}
//           <FaGlobeAmericas className="ml-4 mr-2" /> {recipe.cuisine}
//           <FaClock className="ml-4 mr-2" /> {recipe.cookingTime} minutes
//         </div>
//         <div className="mb-4">
//           <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
//           <ul className="list-disc ml-6 space-y-1">
//             {recipe.ingredients.map((ingredient, index) => (
//               <li key={index}>{ingredient}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="mb-4">
//           <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
//           <ol className="list-decimal ml-6 space-y-2">
//             {recipe.instructions.map((instruction, index) => (
//               <li key={index}>{instruction}</li>
//             ))}
//           </ol>
//         </div>

//         <CommentSection
//           comments={comments}
//           handleCommentSubmit={handleCommentSubmit}
//           handleReplySubmit={handleReplySubmit}
//           newComment={newComment}
//           setNewComment={setNewComment}
//           newReply={newReply}
//           setNewReply={setNewReply}
//         />
//       </div>
//     </motion.div>
//   );
// };

// export default RecipeModal;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaGlobeAmericas, FaClock, FaShareAlt } from 'react-icons/fa';
import CommentSection from './CommentSection';
import axios from 'axios';

const RecipeModal = ({ recipe, closeRecipeDetails }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState({});
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]); // List of users for sharing
  const [selectedUser, setSelectedUser] = useState(''); // User selected for sharing
  const [shareMessage, setShareMessage] = useState(''); // Custom message for sharing

  useEffect(() => {
    // Fetch user ID from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    // Fetch comments for the recipe
    axios.get(`http://localhost:5000/api/comments/target/${recipe._id}`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));

    // Fetch users for sharing the recipe
    axios.get('http://localhost:5000/api/recipeSharing/users') 
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, [recipe._id]);

  // Function to submit a comment
  const handleCommentSubmit = () => {
    if (!newComment.trim() || !userId) return;

    const commentData = {
      userId,
      type: 'recipe',
      targetId: recipe._id,
      comment: newComment,
    };

    axios.post('http://localhost:5000/api/comments', commentData)
      .then(response => {
        setComments([response.data, ...comments]);
        setNewComment('');
      })
      .catch(error => console.error('Error posting comment:', error));
  };

  // Function to submit a reply to a comment
  const handleReplySubmit = (commentId) => {
    if (!newReply[commentId]?.trim() || !userId) return;

    const replyData = {
      userId,
      reply: newReply[commentId],
    };

    axios.post(`http://localhost:5000/api/comments/${commentId}/replies`, replyData)
      .then(response => {
        setComments(comments.map(comment =>
          comment._id === commentId ? response.data : comment
        ));
        setNewReply({ ...newReply, [commentId]: '' });
      })
      .catch(error => console.error('Error posting reply:', error));
  };

  // Function to share the recipe with a user
  // const handleShare = () => {
  //   if (!selectedUser) {
  //     alert('Please select a user to share with.');
  //     return;
  //   }

  //   const shareData = {
  //     recipeId: recipe._id,
  //     sharedWith: selectedUser,
  //     message: shareMessage,
  //   };

  //   axios.post('http://localhost:5000/api/recipeSharing/share', shareData)
  //     .then(() => {
  //       alert('Recipe shared successfully!');
  //     })
  //     .catch(error => {
  //       console.error('Error sharing recipe:', error);
  //       alert('Failed to share the recipe.');
  //     });
  // };


  const handleShare = () => {
    if (!selectedUser) {
      alert('Please select a user to share with.');
      return;
    }
  
    const shareData = {
      recipeId: recipe._id, // Ensure recipe._id is not undefined
      sharedWith: selectedUser,
      message: shareMessage,
    };
  
    axios.post('http://localhost:5000/api/recipeSharing/share', shareData)
      .then(() => {
        alert('Recipe shared successfully!');
      })
      .catch(error => {
        console.error('Error sharing recipe:', error);
        alert('Failed to share the recipe.');
      });
  };
  

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={closeRecipeDetails}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeRecipeDetails}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ×
        </button>
        <div className="mb-4">
          <img
            src={recipe.photos[0]} // Assuming recipe.image holds the URL to the recipe image
            alt={recipe.name}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        </div>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-green">{recipe.name}</h2>
          {/* Share Button */}
          <div>
            <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={handleShare}>
              <FaShareAlt className="text-xl" />
            </button>
            <select
              className="border p-1 rounded"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select User to Share With</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Share Message */}
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Add a message for the user..."
          value={shareMessage}
          onChange={(e) => setShareMessage(e.target.value)}
        />
        <div className="flex items-center mb-4 text-gray-700">
          <FaUtensils className="mr-2" /> {recipe.category}
          <FaGlobeAmericas className="ml-4 mr-2" /> {recipe.cuisine}
          <FaClock className="ml-4 mr-2" /> {recipe.cookingTime} minutes
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc ml-6 space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal ml-6 space-y-2">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        <CommentSection
          comments={comments}
          handleCommentSubmit={handleCommentSubmit}
          handleReplySubmit={handleReplySubmit}
          newComment={newComment}
          setNewComment={setNewComment}
          newReply={newReply}
          setNewReply={setNewReply}
        />
      </div>
    </motion.div>
  );
};

export default RecipeModal;
