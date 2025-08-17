import React from 'react';
import Navbar from '../src/Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../src/Component/Footer/Footer';

const Root = () => {
    return (
          <div className=''>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
              <div className="flex justify-end top-12">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className=" fixed bottom-12 btn btn-primary py-1  text-white inline-block text-sm  text2xl font-bold dark:text-indigo-400 hover:underline"
              >
                Top
              </a>
            </div>
        </div>
    );
};

export default Root;