
// import Signup from "./components/SignUpPage/Signup";


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Signup from './components/SignUpPage/Signup';
import Payment from './components/Payments/Stripe';
import Dishes from './components/MarketPlace/dishes';
import Chefs from './components/MarketPlace/chefs';
import Details from './components/MarketPlace/details';
import Checkout from './components/Payments/Checkout';
import Success from './components/Payments/Success';
import Cancel from './components/Payments/Cancel';
import Home from './components/HomePage/HomePage';
import Recipe from "./components/RecipePage/Recipe"
import ContactUs from './components/ContactUs/Contact';
import SignUp from './pages/SignUp';
import LogIn from "./pages/LogIn";
import OurStory from './components/OurStory/OurStory';
import ReelsList from './pages/ReelsList';
import CheckoutPage from './pages/CheckOut';
import SignUpChef from './pages/ShefRegister';
import FeaturedRecipes from './components/HomePage/FeaturedRecipes';
import RecipeModal from './components/RecipePage/RecipeModal';
import ShareRecipeButton from './pages/Sharing';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Sign-up" element={<SignUp />} />
          <Route path="/ShareRecipeButton" element={<ShareRecipeButton />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/Recipe" element={<Recipe />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/dishes/:id" element={<Dishes/>} />
          <Route path="/MarketPlace" element={<Chefs/>} />
          <Route path="/details" element={<Details/>} />
          <Route path="/about" element={<OurStory/>} />
          <Route path="/ReelsList" element={<ReelsList/>} />
          <Route path="/CheckoutPage" element={<CheckoutPage/>} />
          <Route path="/register" element={<SignUpChef/>} />
          
          <Route path="/" element={<FeaturedRecipes />} />
          <Route path="/RecipeModal" element={<RecipeModal />} />
          <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
