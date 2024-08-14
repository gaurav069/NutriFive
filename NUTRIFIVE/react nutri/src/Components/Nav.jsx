import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoImage from '../assets/logoImage.png';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="p-4 md:p-10 flex items-center justify-between">
            <img className='w-16' src={logoImage} alt="logoImage" />
            {/* <h1 className="text-xl font-semibold">{logoImage}</h1> */}

            {/* Hamburger Button for Mobile */}
            <div className="block md:hidden">
                <button
                    onClick={toggleMenu}
                    className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-blue-500 hover:border-blue-500"
                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path
                            fillRule="evenodd"
                            d="M0 0h20v2H0V0zm0 8h20v2H0V8zm0 8h20v2H0v-2z"
                        />
                    </svg>
                </button>
            </div>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden md:flex space-x-10">
                <NavLink to="/" className="cursor-pointer hover:text-blue-500 font-bold" activeClassName="text-blue-500">Home</NavLink>
                <NavLink to="/about" className="cursor-pointer hover:text-blue-500 font-bold" activeClassName="text-blue-500">About</NavLink>
                <NavLink to="/contact" className="cursor-pointer hover:text-blue-500 font-bold" activeClassName="text-blue-500">Contact</NavLink>
            </nav>

            {/* Mobile Menu (Hidden by default) */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="flex flex-col items-center space-y-2">
                    <NavLink to="/" className="cursor-pointer hover:text-blue-500" activeClassName="text-blue-500">Home</NavLink>
                    <NavLink to="/about" className="cursor-pointer hover:text-blue-500" activeClassName="text-blue-500">About</NavLink>
                    <NavLink to="/contact" className="cursor-pointer hover:text-blue-500" activeClassName="text-blue-500">Contact</NavLink>
                    <NavLink to="/signup" className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Sign Up</NavLink>
                    <NavLink to="/login" className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Log In</NavLink>
                </div>
            </div>

            {/* Sign Up and Log In Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
                <NavLink to={'/signup'} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Sign Up</NavLink>
                <NavLink to={'/login'} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Log In</NavLink>
            </div>
        </div>
    );
};

export default Nav;
