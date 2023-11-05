"use client";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Arrow from "./Icons/Arrow";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed top-0 right-0 w-screen h-10 z-20 ${
        !isVisible && "hidden"
      }`}
    >
      <div className="w-fit mx-auto mt-5">
        <Button onClick={scrollToTop} color="default">
          <Arrow className="-rotate-90" />
          Back to top
        </Button>
      </div>
    </div>
  );
};
export default BackToTop;
