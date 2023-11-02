import React from "react";

const Bookmark = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 22V2H20V22L12 18L4 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 2V1.25C3.80109 1.25 3.61032 1.32902 3.46967 1.46967C3.32902 1.61032 3.25 1.80109 3.25 2L4 2ZM4 22H3.25V23.2135L4.33541 22.6708L4 22ZM20 2H20.75C20.75 1.58579 20.4142 1.25 20 1.25V2ZM20 22L19.6646 22.6708L20.75 23.2135V22H20ZM12 18L12.3354 17.3292L12 17.1615L11.6646 17.3292L12 18ZM3.25 2V22H4.75V2L3.25 2ZM19.25 2V22H20.75V2H19.25ZM20.3354 21.3292L12.3354 17.3292L11.6646 18.6708L19.6646 22.6708L20.3354 21.3292ZM4 2.75H20V1.25H4V2.75ZM4.33541 22.6708L12.3354 18.6708L11.6646 17.3292L3.66459 21.3292L4.33541 22.6708Z"
        fill={color}
      />
    </svg>
  );
};
export default Bookmark;
