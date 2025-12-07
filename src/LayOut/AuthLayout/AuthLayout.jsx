import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const AuthLayout = () => {
    return (
      <div className="max-w-11/12 mx-auto">
       
       <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
        
      </div>
    );
};

export default AuthLayout;