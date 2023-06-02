import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group"
import "../styles/App.css"
import PostItem from "./PostItem";

function PostList({posts, title, remove}) {
   if(!posts.length) {
      return (
         <h1>Посты не найдены</h1>
      )
   }
   return (
      <div className="App">
         <h1>{title}</h1>
         {/*Оборачиваем для использования анимации из библиотеки react-transition-group*/}
         <TransitionGroup>

            {posts.map((post, index) => 
               <CSSTransition 
                  key={post.id}
                  timeout={500}
                  classNames='post'
               >
                  <PostItem remove={remove} number={index + 1} post={post} />  
               </CSSTransition>
            )}

         </TransitionGroup>
      </div>
   );
}
export default PostList;