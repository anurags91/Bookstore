import React from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/REcentlyAdded";

function Home() {
  return (
    <div className="bg-white text-black px-19 py-8">
      <Hero />
      <RecentlyAdded />
    </div>
  );
}

export default Home;
