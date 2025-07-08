import React from 'react';
import AllPosts from '../AllPosts/AllPosts';
import TagsSection from '../../Component/TagsSection/TagsSection';

const Home = () => {
    return (
        <div>
            <h1>i am home.....</h1>
            <TagsSection></TagsSection>
            
            <AllPosts></AllPosts>
        </div>
    );
};

export default Home;