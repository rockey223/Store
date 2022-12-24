import React from "react";
import Featureproduct from "./components/Featureproduct";

import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";



const Home = () => {



  const data = {
    name: "TECH STORE",
  };

  return (
    <>
      <HeroSection myData={data} />
      <Services />
      <Featureproduct/>
      <Trusted />
      
    </>
  );
};

export default Home;
