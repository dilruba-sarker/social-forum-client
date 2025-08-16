

import React, { useRef, useState } from 'react';
import AllPosts from '../AllPosts/AllPosts';
import TagsSection from '../../Component/TagsSection/TagsSection';
import AllAnnouncements from '../../Component/AllAnnouncements';
import Banner from '../../Component/BannerWithSearch/Banner';
import ReviewPage from '../../Component/ReviewPage/ReviewPage';
import NewsletterSection from '../../Component/NewsletterSection/NewsletterSection';


const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput); // ✅ triggers filtered search
     setSearchInput("")
   
  };

  return (
    <div className=''>
      <Banner
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      <TagsSection />
      <AllAnnouncements />
      <AllPosts searchTerm={searchTerm} />
      <ReviewPage></ReviewPage>
      <NewsletterSection></NewsletterSection>
     
    </div>
  );
};

export default Home;
