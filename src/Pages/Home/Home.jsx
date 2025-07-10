// import React from 'react';
// import AllPosts from '../AllPosts/AllPosts';
// import TagsSection from '../../Component/TagsSection/TagsSection';
// import AllAnnouncements from '../../Component/AllAnnouncements';
// import Banner from '../../Component/BannerWithSearch/Banner';

// const Home = () => {
//     return (
//         <div>
//            <Banner></Banner>
//             <TagsSection></TagsSection>
//             <AllAnnouncements></AllAnnouncements>

//             <AllPosts></AllPosts>
//         </div>
//     );
// };

// export default Home;


import React, { useState } from 'react';
import AllPosts from '../AllPosts/AllPosts';
import TagsSection from '../../Component/TagsSection/TagsSection';
import AllAnnouncements from '../../Component/AllAnnouncements';
import Banner from '../../Component/BannerWithSearch/Banner';

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput); // ✅ triggers filtered search
  };

  return (
    <div>
      <Banner
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      <TagsSection />
      <AllAnnouncements />
      <AllPosts searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
