import React, { useEffect, useState } from "react";
import "../styles/App.css"
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";
import PostComments from "./PostComments";
import avatar from "../img/avatar.png"
import { useFetching } from "../hooks/useFetching";
import PostsService from "../API/postsService";
import Loader from "./UI/loader/Loader";

function PostItem(props) {
   const router = useNavigate()

   const [comments, setComments] = useState({})   
      const [fetchPostById, isLoading, error] = useFetching( async (id) => {
         const response = await PostsService.getCommentsByPostId(id)
      setComments(

         response.data
         
      )
   })
   
   useEffect(() => {
      fetchPostById(props.post.id)
   }, [])

   /* console.log(comments.map(value => (
                     
      value.email
      
   ))) */
   console.log(comments)

   

   return (
         <div className="post">
            <div className="post__avatar">
               <img onClick={() => router(`/posts/${props.post.id}`)} src={avatar} alt="avatar" />
            </div>
            <div className="post__content">
               <strong>{props.post.title}</strong>
               <div>
                  {props.post.body}
               </div>
            </div>
            <div className="post__btns">
               <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Открыть</MyButton>
               <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
            </div>
         </div>
   );
}
export default PostItem;