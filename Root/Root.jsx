import React from 'react';
import Navbar from '../src/Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../src/Component/Footer/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;