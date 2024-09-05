import React from 'react';
import Hero from './Hero';
import FeaturedRecipes from './FeaturedRecipes';
import PopularDishes from './PopularDishes';
import RecipeCategories from './RecipeCategories';
import ChefSpotlight from './ChefSpotlight';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';

const Home = () => {
  
  const testimonials = [
    {
      id: 1,
      text: "The vegan buddha bowl was incredibly fresh and delicious. I will definitely order it again!",
      userName: "Alice Morgan",
      userTitle: "Health Enthusiast",
      userImage: "https://example.com/images/user-alice.jpg",
    },
    {
      id: 2,
      text: "I love the gluten-free veggie pizza! It's so tasty, and I feel great after eating it.",
      userName: "John Smith",
      userTitle: "Fitness Coach",
      userImage: "https://example.com/images/user-john.jpg",
    },
    {
      id: 3,
      text: "The grilled salmon with quinoa is my new favorite meal. It's healthy and filling!",
      userName: "Linda White",
      userTitle: "Yoga Instructor",
      userImage: "https://example.com/images/user-linda.jpg",
    },
  ];
  

  return (
    <div>
        <Navbar/>
      <Hero />
      <FeaturedRecipes  />
<RecipeCategories  />
<PopularDishes  />
<ChefSpotlight  />
<CallToAction />
<Testimonials testimonials={testimonials} />
      <Footer />
    </div>
  );
}

export default Home;
