import React, { useEffect, useState } from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group"
import "../styles/App.css"
import PostItem from "./PostItem";
import { useFetching } from "../hooks/useFetching";
import PostsService from "../API/postsService";

function PostList({posts, title, remove}) {
   const [comments, setComments] = useState({})   

   const [fetchPostById, isLoading, error] = useFetching( async (id) => {
      const response = await PostsService.getCommentsByPostId(id)
   
      setComments(

         response.data
         
      )

   })

   useEffect(() => {
      fetchPostById(1)
   }, [])

   useEffect( () => {
      
      const arr = posts.filter( async (item) => {
         if (comments.length) {
            return comments.includes((itemComm) => item.id !== itemComm.id);
         }
         
         
      })
      console.log(arr)
   }, [comments])


   

   
   
   if(!posts.length) {
      return (
         <h1>Посты не найдены</h1>
      )
   }
   return (
      <div className="App">
         <h1>{title}</h1>
         <TransitionGroup>

            {posts.map((post, index) => 
               <CSSTransition 
                  key={post.id}
                  timeout={500}
                  classNames='post'
               >
                  <PostItem key={post.id + index} remove={remove} number={index + 1} post={post} />  
               </CSSTransition>
            )}

         </TransitionGroup>
      </div>
   );
}
export default PostList;