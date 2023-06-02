import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
   return (
      <div className="navbar">
            <div className="navbar__links">
               <Link to="/posts">Главная</Link>
               <Link to="/about">О сайте</Link>
            </div>
         </div>
   )
}

export default Navbar