

// // Updated Recipe component with improved pagination styling
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaSearch } from 'react-icons/fa';
// import NavBar from '../NavBar/NavBar';
// import Footer from '../Footer/Footer';
// import RecipeCard from './RecipeCard';
// import RecipeModal from './RecipeModal';

// const Recipe = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     fetchRecipes();
//   }, [searchTerm, currentPage]);

//   const fetchRecipes = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/myrecipe?page=${currentPage}&limit=8&search=${searchTerm}`);
//       const data = await response.json();
//       setRecipes(data.recipes);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//     }
//   };

//   const openRecipeDetails = (recipe) => {
//     setSelectedRecipe(recipe);
//   };

//   const closeRecipeDetails = () => {
//     setSelectedRecipe(null);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to first page on search
//   };

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <NavBar />
//       <div className="container mx-auto p-4 min-h-screen mt-20">
//         <motion.div
//           className="relative mb-8 p-6 rounded-lg shadow-md bg-cover bg-center"
//           style={{
//             backgroundImage: 'url("https://media.post.rvohealth.io/wp-content/uploads/sites/2/2020/10/GRT-226100-Easy-Healthy-Meals-english-muffin-pizza-well-plated-by-erin-1296x728-header.jpg")'
//           }}
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
//           <div className="relative z-10 flex flex-col items-center">
//             <h1 className="text-4xl font-bold text-white mb-4">Discover and Explore Recipes</h1>
//             <p className="text-lg text-gray-200 text-center mb-6">Browse through a variety of recipes and get detailed instructions with ingredients.</p>
//             <motion.div 
//               className="relative px-2 w-full sm:w-1/2 md:w-1/4"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <FaSearch className="absolute left-3 top-3 text-green-500 ml-2" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder="Search recipes..."
//                 className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green bg-white bg-opacity-90"
//               />
//             </motion.div>
//           </div>
//         </motion.div>

//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, staggerChildren: 0.1 }}
//         >
//           <AnimatePresence>
//             {recipes.map(recipe => (
//               <motion.div
//                 key={recipe._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <RecipeCard
//                   recipe={recipe}
//                   openRecipeDetails={openRecipeDetails}
//                   userId={userId}
//                 />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         {/* Pagination Controls */}
//         <div className="flex justify-center items-center mt-8">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 mx-1 border rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'} transition duration-150`}
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2 mx-1 text-lg">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 mx-1 border rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'} transition duration-150`}
//           >
//             Next
//           </button>
//         </div>

//         <AnimatePresence>
//           {selectedRecipe && (
//             <RecipeModal
//               recipe={selectedRecipe}
//               closeRecipeDetails={closeRecipeDetails}
//               userId={userId}
//             />
//           )}
//         </AnimatePresence>
//       </div>
//       <Footer />
//     </motion.div>
//   );
// };

// export default Recipe;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    fetchRecipes();
  }, [searchTerm, currentPage]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/myrecipe?page=${currentPage}&limit=8&search=${searchTerm}`);
      const data = await response.json();
      setRecipes(data.recipes);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const openRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCommentOrReply = () => {
    if (!userId) {
      Swal.fire({
        title: 'Not Logged In',
        text: 'You need to log in to comment or reply.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Log In',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); // Redirect to login page
        }
      });
      return;
    }
    // Proceed with comment or reply logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavBar />
      <div className="container mx-auto p-4 min-h-screen mt-20">
        <motion.div
          className="relative mb-8 p-6 rounded-lg shadow-md bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://media.post.rvohealth.io/wp-content/uploads/sites/2/2020/10/GRT-226100-Easy-Healthy-Meals-english-muffin-pizza-well-plated-by-erin-1296x728-header.jpg")'
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-white mb-4">Discover and Explore Recipes</h1>
            <p className="text-lg text-gray-200 text-center mb-6">Browse through a variety of recipes and get detailed instructions with ingredients.</p>
            <motion.div 
              className="relative px-2 w-full sm:w-1/2 md:w-1/4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSearch className="absolute left-3 top-3 text-green-500 ml-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search recipes..."
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green bg-white bg-opacity-90"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <AnimatePresence>
            {recipes.map(recipe => (
              <motion.div
                key={recipe._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RecipeCard
                  recipe={recipe}
                  openRecipeDetails={openRecipeDetails}
                  userId={userId}
                  handleCommentOrReply={handleCommentOrReply} // Pass function
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 border rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'} transition duration-150`}
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-1 text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 border rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'} transition duration-150`}
          >
            Next
          </button>
        </div>

        <AnimatePresence>
          {selectedRecipe && (
            <RecipeModal
              recipe={selectedRecipe}
              closeRecipeDetails={closeRecipeDetails}
              userId={userId}
            />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Recipe;
