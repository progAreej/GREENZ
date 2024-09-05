

// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { FaUtensils, FaGlobeAmericas, FaClock, FaShareAlt } from 'react-icons/fa';

// // const RecipeCard = ({ recipe, openRecipeDetails }) => {
// //   const handleShare = () => {
// //     // Share URL and recipe content
// //     const shareData = {
// //       title: recipe.name,
// //       text: `${recipe.name} - ${recipe.category}: ${recipe.instructions.join(' ')}`,
// //       url: window.location.href // URL of the current page
// //     };
    
// //     if (navigator.share) {
// //       navigator.share(shareData)
// //         .then(() => console.log('Thanks for sharing!'))
// //         .catch((error) => console.log('Error sharing:', error));
// //     } else {
// //       // Fallback for browsers that do not support the Share API
// //       alert('Sharing is not supported in this browser.');
// //     }
// //   };

// //   return (
// //     <motion.div
// //       className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 hover:opacity-90 transition duration-300"
// //       whileHover={{ y: -5 }}
// //       onClick={() => openRecipeDetails(recipe)}
// //     >
// //       <div
// //         className="h-48 bg-cover bg-center rounded-t-lg"
// //         style={{ backgroundImage: `url(${recipe.photos && recipe.photos[0]})` }}
// //       ></div>
// //       <div className="p-4">
// //         <h2 className="text-xl font-semibold mb-2 text-green">{recipe.name}</h2>
// //         <p className="text-gray mb-1"><FaUtensils className="inline mr-2" />{recipe.category}</p>
// //         <p className="text-gray mb-1"><FaGlobeAmericas className="inline mr-2" />{recipe.cuisine}</p>
// //         <p className="text-gray"><FaClock className="inline mr-2" />{recipe.cookingTime} minutes</p>
// //         <button
// //           onClick={handleShare}
// //           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
// //         >
// //           <FaShareAlt /> Share
// //         </button>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default RecipeCard;


// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaUtensils, FaGlobeAmericas, FaClock, FaShareAlt } from 'react-icons/fa';

// const RecipeCard = ({ recipe, openRecipeDetails }) => {
//   const handleShare = (e) => {
//     e.stopPropagation(); // Prevent card click from firing
//     const shareData = {
//       title: recipe.name,
//       text: `${recipe.name} - ${recipe.category}: ${recipe.instructions.join(' ')}`,
//       url: window.location.href
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
//       className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 max-w-sm"
//       whileHover={{ y: -10 }}
//       onClick={() => openRecipeDetails(recipe)}
//       style={{ width: '100%', maxWidth: '320px' }} // Ensure all cards have the same width
//     >
//       <div
//         className="h-48 bg-cover bg-center rounded-t-xl"
//         style={{ backgroundImage: `url(${recipe.photos && recipe.photos[0]})` }}
//       ></div>
//       <div className="p-4">
//         <h2 className="text-xl font-bold mb-2 text-gray-800">{recipe.name}</h2>
//         <div className="flex justify-between items-center text-gray-600 mb-1">
//           <span className="flex items-center">
//             <FaUtensils className="text-green mr-2" />
//             {recipe.category}
//           </span>
//           <span className="flex items-center">
//             <FaGlobeAmericas className="text-blue-600 mr-2" />
//             {recipe.cuisine}
//           </span>
//         </div>
//         <div className="flex justify-between items-center text-gray-600 mb-1">
//           <span className="flex items-center">
//             <FaClock className="text-yellow mr-2" />
//             {recipe.cookingTime} min
//           </span>
//           <button
//             onClick={handleShare}
//             className="bg-green text-white px-3 py-1 rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-yellow transition-colors duration-300"
//           >
//             <FaShareAlt className="text-lg" />
//             Share
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default RecipeCard;



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaGlobeAmericas, FaClock, FaShareAlt, FaInfoCircle } from 'react-icons/fa';

const RecipeCard = ({ recipe, openRecipeDetails }) => {
  const [showNutrition, setShowNutrition] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation(); // Prevent card click from firing
    const shareData = {
      title: recipe.name,
      text: `${recipe.name} - ${recipe.category}: ${recipe.instructions.join(' ')}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Thanks for sharing!'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Sharing is not supported in this browser.');
    }
  };

  const toggleNutrition = () => {
    setShowNutrition(!showNutrition);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 max-w-sm"
      whileHover={{ y: -10 }}
      onClick={() => openRecipeDetails(recipe)}
      style={{ width: '100%', maxWidth: '320px' }} // Ensure all cards have the same width
    >
      <div
        className="h-48 bg-cover bg-center rounded-t-xl"
        style={{ backgroundImage: `url(${recipe.photos && recipe.photos[0]})` }}
      ></div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{recipe.name}</h2>
        <div className="flex justify-between items-center text-gray-600 mb-1">
          <span className="flex items-center">
            <FaUtensils className="text-green mr-2" />
            {recipe.category}
          </span>
          <span className="flex items-center">
            <FaGlobeAmericas className="text-blue-600 mr-2" />
            {recipe.cuisine}
          </span>
        </div>
        <div className="flex justify-between items-center text-gray-600 mb-1">
          <span className="flex items-center">
            <FaClock className="text-yellow mr-2" />
            {recipe.cookingTime} min
          </span>
          <button
            onClick={handleShare}
            className="bg-green text-white px-3 py-1 rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-yellow transition-colors duration-300"
          >
            <FaShareAlt className="text-lg" />
            Share
          </button>
        </div>
        <button
          onClick={toggleNutrition}
          className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 flex items-center justify-center gap-2 shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          <FaInfoCircle className="text-lg" />
          Nutrition Facts
        </button>
        {showNutrition && (
          <div className="mt-4 text-gray-700">
            <h3 className="text-lg font-semibold mb-2">Nutrition Facts</h3>
            <ul>
              {recipe.nutritionFacts ? (
                Object.entries(recipe.nutritionFacts).map(([key, value]) => (
                  <li key={key} className="mb-1">
                    <strong>{key}:</strong> {value}
                  </li>
                ))
              ) : (
                <li>No nutrition facts available</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecipeCard;

