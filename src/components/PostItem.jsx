import React from "react";
import "../styles/App.css"
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";
import PostComments from "./PostComments";
import avatar from "../img/avatar.png"


function PostItem(props) {
   const router = useNavigate()
   return (
         <div className="post">
            <div className="post__avatar">
               <img onClick={() => router(`/posts/${props.post.id}`)} src={avatar} alt="avatar" />
            </div>
            <div className="post__content">
               <strong>{props.post.title}</strong>
               <div>
                  {props.post.body}
                  {/* <PostComments /> */}
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