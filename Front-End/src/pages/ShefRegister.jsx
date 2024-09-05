

// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate, Link } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

// const SignUpChef = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [specialties, setSpecialties] = useState('');
//   const [experience, setExperience] = useState('');
//   const navigate = useNavigate(); // Initialize navigate

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         name,
//         email,
//         password,
//         specialties: specialties.split(',').map(item => item.trim()),
//         experience: parseInt(experience, 10),
//       });
//       Swal.fire({
//         title: 'Success!',
//         text: 'Sign-up successful. Redirecting to the login page.',
//         icon: 'success',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         navigate('/'); // Redirect to login page
//       });
//     } catch (error) {
//       console.error('Error registering chef:', error);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Sign-up failed. Please check the form and try again.',
//         icon: 'error',
//         confirmButtonText: 'OK'
//       });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-md">
//       <h2 className="text-2xl font-bold text-green mb-6">Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="specialties">
//             Specialties (comma-separated)
//           </label>
//           <input
//             type="text"
//             id="specialties"
//             placeholder="Specialties"
//             value={specialties}
//             onChange={(e) => setSpecialties(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="experience">
//             Years of Experience
//           </label>
//           <input
//             type="number"
//             id="experience"
//             placeholder="Experience"
//             value={experience}
//             onChange={(e) => setExperience(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-green text-white py-2 px-4 rounded-md hover:bg-green-light focus:outline-none focus:ring-2 focus:ring-green"
//         >
//           Sign Up
//         </button>
//       </form>
//       {/* <div className="mt-4 text-center">
//         <p className="text-gray-700 text-sm">
//           Already have an account?{' '}
//           <Link to="/login" className="text-green hover:underline">
//             Login
//           </Link>
//         </p>
//       </div> */}
//     </div>
//   );
// };

// export default SignUpChef;


import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils, FaEnvelope, FaLock, FaUser, FaGraduationCap } from 'react-icons/fa';
import logo from "../assets/logo.png";

const SignUpChef = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [experience, setExperience] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        specialties: specialties.split(',').map(item => item.trim()),
        experience: parseInt(experience, 10),
      });
      Swal.fire({
        title: 'Application Received!',
        text: 'Thank you for your interest in joining Greenz. We will review your application and get in touch with you soon.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4CAF50'
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Error registering chef:', error);
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4CAF50'
      });
    }
  };

  const inputVariants = {
    focus: { scale: 1.05, transition: { duration: 0.3 } },
    blur: { scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="max-w-md mx-auto mt-10 p-8 bg-gray-200 shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-yellow mb-6 text-center ">Join Us as a Chef</h2>
      <p className="text-gray-600 mb-6 text-center ">Share your culinary expertise with  <span className='font-bold ml-2 text-green '> GREENZ </span></p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
            <FaUser className="inline mr-2 text-yellow" />Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
            required
          />
        </motion.div>
        <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            <FaEnvelope className="inline mr-2 text-yellow" />Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
            required
          />
        </motion.div>
        <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            <FaLock className="inline mr-2 text-yellow" />Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Choose a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
            required
          />
        </motion.div>
        <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="specialties">
            <FaUtensils className="inline mr-2 text-yellow" />Specialties (comma-separated)
          </label>
          <input
            type="text"
            id="specialties"
            placeholder="e.g., Italian, Vegan, Desserts"
            value={specialties}
            onChange={(e) => setSpecialties(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
          />
        </motion.div>
        <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="experience">
            <FaGraduationCap className="inline mr-2 text-yellow" />Years of Experience
          </label>
          <input
            type="number"
            id="experience"
            placeholder="Your years of cooking experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green"
          />
        </motion.div>
        <motion.button
          type="submit"
          className="w-full bg-green text-white py-3 px-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green transition duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Greenz
        </motion.button>
      </form>
      <motion.p 
        className="mt-6 text-center text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        By joining, you agree to our Terms of Service and Privacy Policy
      </motion.p>
    </motion.div>
  );
};

export default SignUpChef;