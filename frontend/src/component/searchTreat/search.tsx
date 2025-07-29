import React, { useState } from "react";
import "./style.css";

export const SearchBar = () => {
  const [input, setInput] = useState("");

//   const fetchData = (value) => {
//     fetch("")
//   }

//   const handleChange = (value) => {
//     setInput(value)
//     fetchData(value)
//   }

  return (
    <div>
    <div className="input-wrapper">
      <input
        placeholder="ค้นหารายชื่อ"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="imargin ">
        <div className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
          clipRule="evenodd"
          className="flex"
        />
      </svg>
      </div>
      </div>
    </div>
    </div>
  );
};
export default SearchBar
