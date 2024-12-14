import React from 'react';
import { FC } from 'react';
import HowLampdrivingWorkSection from './components/how-lampdriving-works/HowLampdrivingWorkSection';
import ChooseBestInstructorSelections from './components/instructor-selection/ChooseBestInstructorSelections';
import FeaturedInstructors from './components/featured-instructors/FeaturedInstructors';
import Testimonials from './components/testimonials/Testimonials';
import AboutUs from './components/about-us-section/AboutUs';
import FAQSection from './components/faq-section/FAQSection';
import Banner from './components/banner/Banner';
const HomePage: FC = () => {
  return (
    <div>
      <Banner />
      <HowLampdrivingWorkSection />
      <ChooseBestInstructorSelections />
      <FeaturedInstructors />
      <Testimonials />
      <AboutUs />
      <FAQSection />
    </div>
  );
};

export default HomePage;