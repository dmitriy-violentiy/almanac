import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../Menu";

const Navbar = () => {
   const [menuActive, setMenuActive] = useState(false)

   return (
      <div className="navbar">
            <Menu active={menuActive} setActive={setMenuActive} header={"Меню"}/>
            <div className="navbar__links">
               <nav>
                  <div className="burger-btn" onClick={() => {setMenuActive(!menuActive)}}>
                     <span></span>
                  </div>
               </nav>
               <Link to="/posts">Главная</Link>
               <Link to="/about">Обо мне</Link>
            </div>
         </div>
   )
}

export default Navbar