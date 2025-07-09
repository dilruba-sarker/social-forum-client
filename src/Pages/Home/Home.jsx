import React from 'react';
import AllPosts from '../AllPosts/AllPosts';
import TagsSection from '../../Component/TagsSection/TagsSection';
import AllAnnouncements from '../../Component/AllAnnouncements';

const Home = () => {
    return (
        <div>
           
            <TagsSection></TagsSection>
            <AllAnnouncements></AllAnnouncements>

            <AllPosts></AllPosts>
        </div>
    );
};

export default Home;