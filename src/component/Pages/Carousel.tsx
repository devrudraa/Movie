"use client";
import Image from "next/image";
import React from "react";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Dot from "../Icons/Dot";
import Star from "../Icons/Star";

const Carousel = () => {
  return (
    <section className="px-8 space-y-5">
      <h1 className="headingSection">Explore Movies</h1>
      <ReactCarousel
        showArrows
        showThumbs={false}
        useKeyboardArrows={true}
        showStatus={false}
        stopOnHover
        autoPlay
        infiniteLoop
      >
        <CarouselBanner />
        <CarouselBanner />
        <CarouselBanner />
      </ReactCarousel>
    </section>
  );
};
export default Carousel;

function CarouselBanner() {
  return (
    <div className="flex p-5 sm:mx-auto w-fit max-w-4xl gap-10 flex-col md:flex-row text-left mx-2">
      <Image
        src={"/movieThub.png"}
        width={250}
        height={250}
        alt="Movie Thumb"
        className="rounded-lg"
      />
      <div className="space-y-8 flex flex-col pb-10">
        <div className="space-y-2">
          <div>
            <h1 className="text-3xl font-semibold">
              Mid-Season Trailer - Season 2
            </h1>
            <div className="text-sm font-light text-gray-300 gap-3 flex items-center">
              <label>2013</label>
              <Dot />
              <label>R</label>
              <Dot />
              <label>2hr 1min</label>
            </div>
          </div>
          <div className="flex gap-3">
            <Star />
            7.6 / 10
          </div>
        </div>
        <p className="flex-1">
          The mercurial villain Loki resumes his role as the God of Mischief in
          a new series that takes place after the events of &quot;Avengers:
          Endgame.&quot;
        </p>
        <div className="flex gap-3 ">
          <div className="px-3 py-1 border-white border w-fit rounded-full cursor-pointer">
            Action
          </div>
          <div className="px-3 py-1 border-white border w-fit rounded-full cursor-pointer">
            Drama
          </div>
          <div className="px-3 py-1 border-white border w-fit rounded-full cursor-pointer">
            Horror
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import Image from "next/image";
// import React from "react";
// import { Carousel as ReactCarousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Dot from "../Icons/Dot";
// import Star from "../Icons/Star";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

// const Carousel = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <section className="px-8 space-y-5">
//       <h1 className="headingSection">Explore Movies</h1>
//       {/* <ReactCarousel
//         showArrows
//         showThumbs={false}
//         stopOnHover
//         autoPlay
//         infiniteLoop
//       >
//         <CarouselBanner />
//         <CarouselBanner />
//         <CarouselBanner />
//       </ReactCarousel> */}
//       <Slider {...settings}>
//         <CarouselBanner />
//         <CarouselBanner />
//         <CarouselBanner />
//       </Slider>
//     </section>
//   );
// };
// export default Carousel;

// function CarouselBanner() {
//   return (
//     <div className="flex p-5 sm:mx-auto w-fit max-w-4xl gap-10 flex-col md:flex-row text-left mx-2">
//       <Image
//         src={"/movieThub.png"}
//         width={250}
//         height={250}
//         alt="Movie Thumb"
//         className="rounded-lg"
//       />
//       <div className="space-y-8 flex flex-col pb-10">
//         <div className="space-y-2">
//           <div>
//             <h1 className="text-3xl font-semibold">
//               Mid-Season Trailer - Season 2
//             </h1>
//             <div className="text-sm font-light text-gray-300 gap-3 flex items-center">
//               <label>2013</label>
//               <Dot />
//               <label>R</label>
//               <Dot />
//               <label>2hr 1min</label>
//             </div>
//           </div>
//           <div className="flex gap-3">
//             <Star />
//             7.6 / 10
//           </div>
//         </div>
//         <p className="flex-1">
//           The mercurial villain Loki resumes his role as the God of Mischief in
//           a new series that takes place after the events of &quot;Avengers:
//           Endgame.&quot;
//         </p>
//         <div className="flex gap-3 ">
//           <div className="px-3 py-1 border-white border w-fit rounded-full cursor-pointer">
//             Action
//           </div>
//           <div className="px-3 py-1 border-white border w-fit rounded-full cursor-pointer">
//             Drama
//           </div>
//           <div className="px-3 py-1 border-white border w-fit rounded-full cursor-pointer">
//             Horror
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
