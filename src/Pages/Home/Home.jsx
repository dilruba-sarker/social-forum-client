import React from 'react';
import AllPosts from '../AllPosts/AllPosts';
import TagsSection from '../../Component/TagsSection/TagsSection';

const Home = () => {
    return (
        <div>
           
            <TagsSection></TagsSection>

            <AllPosts></AllPosts>
        </div>
    );
};

export default Home;