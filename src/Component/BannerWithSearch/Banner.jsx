
import React from "react";
import bg from '../../assets/bg.png'
const Banner = ({ searchInput, setSearchInput, handleSearch }) => {
  return (
    <div className="bg-blue-100 py-10 px-4 mb-10  h-64" style={{backgroundImage:`url(${bg})`}}>
      <h1 className="text-3xl font-bold text-center text-amber-50 mb-4">Discover Posts by Tag</h1>
      <form
        onSubmit={handleSearch}
        className="flex justify-center gap-2 max-w-md mx-auto"
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by tag"
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};

export default Banner;
