import React, { useEffect, useState } from "react";
import "../styles/App.css"
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";
import avatar from "../img/avatar.png"
import PostsService from "../API/postsService";

function PostItem(props) {
   const router = useNavigate()
   
   const [comments, setComments] = useState([])
   const [showComments, setShowComments] = useState(false)

   useEffect(() => { 
      const getComments = async()=> {
         const response = await PostsService.getCommentsByPostId(props.post.id)
         setComments(response.data);
      }
      getComments();
   }, [showComments]);

   return (
         <div className="post">

            <div className="post__body">
               <div className="post_wrap">
                  <div className="post__avatar">
                     <img onClick={() => router(`/posts/${props.post.id}`)} src={avatar} alt="avatar" />
                  </div>
                  <div className="post__content">
                     <strong>{props.post.title}</strong>
                     <div>
                        <div className="post__body">{props.post.body}</div>
                     </div>
                  </div>
               </div>
               <div className="post__btns">
                  <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Открыть пост</MyButton>
                  <MyButton onClick={() => props.remove(props.post)}>Удалить пост</MyButton>
                  <MyButton onClick={() => setShowComments(!showComments)}>{showComments ? 'Скрыть комментарии' : 'Показать комментарии'}</MyButton>
               </div>
            </div>
            
            {showComments &&
               <div className="post__comments">
               <h3>Комментарии:</h3>
               {comments.map((el, index)=>{
                  return <div key={index}>
                     <div><b>{el.email}</b></div>
                     <div>{el.body}</div>
                  </div> 
               })}
               </div>
            }

         </div>
   );
}
export default PostItem;