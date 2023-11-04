import Image from "next/image";
import React from "react";

const Nothing = () => {
  return (
    <section className="max-w-md grid place-items-center py-5 px-3 mx-auto min-h-screen">
      <div className="space-y-5 text-center">
        <Image width={300} height={300} src={"/nothing.png"} alt="Nothing" />
        <h1 className="text-3xl font-bold">Its nothing to see here!</h1>
      </div>
    </section>
  );
};
export default Nothing;
