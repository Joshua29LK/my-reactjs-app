import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import '../../assets/css/menu.css';

const Menu = () => {
    return (
        <div className="header w-100">
            <div className="container d-flex">
                <div className="logo col-md-3">
                    <NavLink exact to='/' className="text-white d-block">
                        <img src={logo} alt="Logo" className="h-auto" />
                    </NavLink>
                </div>
                <nav className="col-md-9">
                    <ul className="w-100 mb-0 pl-0">
                        <li className="d-inline-block">
                            <NavLink exact to='/' className="text-white d-block">Items</NavLink>
                        </li>
                        <li className="d-inline-block">
                            <NavLink exact to='about-us' className="text-white d-block">About Us</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
 
export default Menu;