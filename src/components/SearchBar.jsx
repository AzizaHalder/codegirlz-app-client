const SearchBar = ({ onQuery }) => {
  return (
    <div className="SearchBar">
      <label htmlFor="">Search </label>
      <input type="text" onChange={(e) => onQuery(e.target.value)} />
    </div>
  );
};

export default SearchBar;
