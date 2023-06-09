import React, { useState } from "react";
import "../styles/App.css"
import { Link } from "react-router-dom";
import myAvatar from "../img/myAvatar.jpg"

const Menu = ({header, active, setActive}) => {
   
   return (
      <div className={active ? 'menu active' : 'menu'} onClick={() => {setActive(false)}}>
         <div className="blur" />
         <div className="menu__content" onClick={e => e.stopPropagation()}>
            <div className="menu__header">{header}</div>
            <div className="menu__personal_info">
               <img src={myAvatar} alt="my avatar" />
               <p>Дмитрий Виолентий</p>
               <a href="mailto:violentiy1997@mail.ru">violentiy1997@mail.ru</a>
            </div>
            <ul className="menu__header_links">
               <Link  onClick={() => {setActive(false)}} to="/posts" >Главная</Link>
               <Link  onClick={() => {setActive(false)}} to="/about">Обо мне</Link>
            </ul>
         </div>
         
      </div>
   )
}

export default Menu