import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import MarqueeComponent from './Components/MarqueeComponent';
import Sidebyside from './Components/Sidebyside';
import Footer from './Components/Footer';
import About from './Components/About'; 
import Contact from './Components/Contact'; 
import Login from './Components/Login';
import Signup from './Components/Signup';


const App = () => {
  return (
    <>
      <div className="h-screen w-full">
        <Nav />
        <MarqueeComponent />
        <Sidebyside />
        <Footer />
      </div>
    </>
  );
};

export default App;
