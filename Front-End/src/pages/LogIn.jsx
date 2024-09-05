

// import React from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useState, useEffect } from "react";

// import { useNavigate, Link } from "react-router-dom";

// function LogIn() {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [error, setError] = useState();

//   const navigate = useNavigate();
//   const loginGoogle = () => {
//     window.open("http://localhost:5000/api/users/auth/google/", "_blank");
//     console.log("test");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/users/login",
//         { email, password }
//       );
//       Cookies.set("token", response.data, { expires: 7 });

//       navigate("/");
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Login failed , Please check your credentials");
//     }
//   };
//   return (
//     <>
//       <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-lg text-center">
//           <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

//           <p className="mt-4 text-gray-500">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
//             nulla eaque error neque ipsa culpa autem, at itaque nostrum!
//           </p>
//         </div>

//         <form
//           action="#"
//           className="mx-auto mb-0 mt-8 max-w-md space-y-4"
//           onSubmit={handleSubmit}
//         >
//           <div>
//             <label htmlFor="email" className="sr-only">
//               Email
//             </label>

//             <div className="relative">
//               <input
//                 type="email"
//                 className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                 placeholder="Enter email"
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="size-4 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                   />
//                 </svg>
//               </span>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="password" className="sr-only">
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type="password"
//                 className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                 placeholder="Enter password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="size-4 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                   />
//                 </svg>
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <p className="text-sm text-gray-500">
//               No account?
//               <Link to="/Sign-up" className="underline" href="#">
//                 Sign up
//               </Link>
//             </p>

//             <button
//               type="submit"
//               className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
//             >
//               Sign in
//             </button>
//           </div>
//           <button
//             type="submit"
//             className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
//             onClick={loginGoogle}
//           >
//             Sign in with google
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default LogIn;

// // import React, { useState } from "react";
// // import Swal from "sweetalert2";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { Link } from "react-router-dom";
// // import { FaGoogle } from "react-icons/fa";
// // import { motion } from "framer-motion";

// // import photo from "../assets/undraw_healthy_lifestyle_re_ifwg (2).svg";
// // import logo from "../assets/logo.png";

// // function SignIn() {
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!email || !password) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "Oops...",
// //         text: "Please fill in all the fields!",
// //       });
// //       return;
// //     }

// //     try {
// //       await axios.post("http://localhost:5000/api/users/login", {
// //         email,
// //         password,
// //       });

// //       Swal.fire({
// //         icon: "success",
// //         title: "Logged in successfully!",
// //         showConfirmButton: false,
// //         timer: 1500,
// //       });

// //       navigate("/");
// //     } catch (err) {
// //       console.error("Login error:", err);
// //       Swal.fire({
// //         icon: "error",
// //         title: "Login failed",
// //         text: "An error occurred, please try again.",
// //       });
// //     }
// //   };

// //   const loginGoogle = () => {
// //     Swal.fire({
// //       title: "Redirecting to Google...",
// //       text: "Please wait while we redirect you to Google for authentication.",
// //       timer: 2000,
// //       timerProgressBar: true,
// //       showConfirmButton: false,
// //       willClose: () => {
// //         window.open("http://localhost:5000/api/users/auth/google", "_blank");
// //       },
// //     });
// //   };

// //   return (
// //     <div className="font-[sans-serif]">
// //       <motion.div
// //         initial={{ opacity: 0, y: -50 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 1, delay: 0.5 }}
// //         className="min-h-screen flex flex-col items-center justify-center py-6 px-4"
// //       >
// //         <div className="mr-24 mb-2">
// //           <img src={logo} alt="logo" className="w-32 mb-8 mx-auto block" />
// //         </div>
// //         <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
// //           <div>
// //             <img src={photo} alt="" className="w-96" />
// //           </div>
// //           <div className="border  border-green border-2 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
// //             <form className="space-y-4" onSubmit={handleSubmit}>
// //               <div className="mb-8">
// //                 <h3 className="text-green text-3xl font-extrabold text-center tex">
// //                   Log-in
// //                 </h3>
// //               </div>

// //               <div>
// //                 <label className="text-green text-sm mb-2 block">Email</label>
// //                 <div className="relative flex items-center">
// //                   <input
// //                     name="emil"
// //                     type="text"
// //                     required
// //                     className="w-full text-sm text-green transition-all border border-gray-300 px-4 py-3 rounded-lg outline-green"
// //                     placeholder="Enter Your Email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                   />
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     fill="#bbb"
// //                     stroke="#bbb"
// //                     className="w-[18px] h-[18px] absolute right-4"
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <circle
// //                       cx="10"
// //                       cy="7"
// //                       r="6"
// //                       data-original="#4CAF50"
// //                     ></circle>
// //                     <path
// //                       d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
// //                       data-original="#4CAF50"
// //                     ></path>
// //                   </svg>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="text-green text-sm mb-2 block">
// //                   Password
// //                 </label>
// //                 <div className="relative flex items-center">
// //                   <input
// //                     name="password"
// //                     type={showPassword ? "text" : "password"}
// //                     required
// //                     className="w-full text-sm text-green border border-gray-300 px-4 py-3 rounded-lg outline-green"
// //                     placeholder="Enter password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                   />
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     fill="#bbb"
// //                     stroke="#bbb"
// //                     className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
// //                     viewBox="0 0 128 128"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                   >
// //                     <path
// //                       d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
// //                       data-original="#000000"
// //                     ></path>
// //                   </svg>
// //                 </div>
// //               </div>

// //               <div className="!mt-8">
// //                 <button
// //                   type="submit"
// //                   className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg transition-all text-white bg-green hover:bg-white hover:text-green  border-green border-2 focus:outline-none"
// //                 >
// //                   Log in
// //                 </button>
// //               </div>

// //               <p className="text-sm !mt-8 text-center text-gray-800">
// //                 Don't have an account{" "}
// //                 <Link
// //                   to="/Sign-up"
// //                   className="text-green font-semibold hover:underline ml-1 whitespace-nowrap"
// //                 >
// //                   Register here
// //                 </Link>
// //               </p>
// //             </form>

// //             <button
// //               type="button"
// //               className="mt-4 w-full py-3 text-center flex justify-start gap-24 items-center px-4 text-sm tracking-wide rounded-lg transition-all border-green border-2 text-green bg-white hover:text-white hover:bg-green  focus:outline-none"
// //               onClick={loginGoogle}
// //             >
// //               <FaGoogle className="justify-self-start h-8 w-8" />
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 fill="#000"
// //                 stroke="#000"
// //                 className="w-4 h-4 absolute right-4 cursor-pointer"
// //                 viewBox="0 0 128 128"
// //                 onClick={() => setShowPassword(!showPassword)}
// //               >
// //                 <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
// //               </svg>
// //               Sign in with Google
// //             </button>
// //           </div>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }

// // export default SignIn;


import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import photo from "../assets/undraw_healthy_lifestyle_re_ifwg (2).svg";
import logo from "../assets/logo.png";

function LogIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the fields!",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      Cookies.set("token", response.data, { expires: 7 });
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "An error occurred, please try again.",
      });
    }
  };

  const loginGoogle = () => {
    Swal.fire({
      title: "Redirecting to Google...",
      text: "Please wait while we redirect you to Google for authentication.",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        const response = window.open(
          "http://localhost:5000/api/users/auth/google",
          "_blank"
        );
        Cookies.set("token", response.data, { expires: 7 });
      },
    });
  };

  return (
    <div className="font-[sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="min-h-screen flex flex-col items-center justify-center py-6 px-4"
      >
        <div className="mr-24 mb-2">
          <img src={logo} alt="logo" className="w-32 mb-8 mx-auto block" />
        </div>
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div>
            <img src={photo} alt="" className="w-96" />
          </div>
          <div className="border  border-green border-2 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-green text-3xl font-extrabold text-center tex">
                  Log-in
                </h3>
              </div>

              <div>
                <label className="text-green text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="emil"
                    type="text"
                    required
                    className="w-full text-sm text-green transition-all border border-gray-300 px-4 py-3 rounded-lg outline-green"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#4CAF50"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#4CAF50"
                    ></path>
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-green text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full text-sm text-green border border-gray-300 px-4 py-3 rounded-lg outline-green"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg transition-all text-white bg-green hover:bg-white hover:text-green  border-green border-2 focus:outline-none"
                >
                  Log in
                </button>
              </div>

              <p className="text-sm !mt-8 text-center text-gray-800">
                Don't have an account{" "}
                <Link
                  to="/Sign-up"
                  className="text-green font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </form>

            <button
              type="button"
              className="mt-4 w-full py-3 text-center flex justify-start gap-24 items-center px-4 text-sm tracking-wide rounded-lg transition-all border-green border-2 text-green bg-white hover:text-white hover:bg-green  focus:outline-none"
              onClick={loginGoogle}
            >
              <FaGoogle className="justify-self-start h-8 w-8" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                stroke="#000"
                className="w-4 h-4 absolute right-4 cursor-pointer"
                viewBox="0 0 128 128"
                onClick={() => setShowPassword(!showPassword)}
              >
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LogIn;