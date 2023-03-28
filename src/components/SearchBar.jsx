// import { useState } from "react";

const SearchBar = ({ onQuery }) => {
  //   const [query, setQuery] = useState("");

  return (
    <div className="SearchBar">
      <label htmlFor="">Search </label>
      <input
        type="text"
        // value={query}
        onChange={(e) => {
          onQuery(e.target.value);
        }}
      />

      {/**@todo implement clear search button */}

      {/* <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onQuery(query);
        }}
      /> */}

      {/* <button
        onClick={(e) => {
          setQuery("");
          onQuery(query);
        }}
      >
        ❌
      </button> */}
    </div>
  );
};

export default SearchBar;
