import Logo from "../Icons/Logo";
import Nav from "../Navbar";
import React from "react";

const Hero = () => {
  return (
    <main id="hero">
      <Nav />
      <div className="flex items-center justify-center h-[40rem] max-h-screen">
        <div className="text-center space-y-3 px-5">
          <Logo className="mx-auto" width="90" height="90" />
          <h1 className="md:text-5xl text-4xl font-bold ">
            Discover, Watch, Repeat
          </h1>
          <h3 className="md:text-3xl text-xl font-semibold">
            Your Cinematic Escape
          </h3>
        </div>
      </div>
    </main>
  );
};
export default Hero;
