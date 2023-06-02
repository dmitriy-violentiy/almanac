import React, { useState } from "react";
import "../styles/App.css"
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

function PostForm({create}) {

   const [post, setPost] = useState({title: '', body: ''})

   const addNewPost = (e) => {
      e.preventDefault()
      const newPost = {
         ...post, id: Date.now()
      }
      create(newPost)
      setPost({title: '', body: ''})
   }

   return (
      <div>
         <form>
            <MyInput 
               type="text" 
               placeholder="Заголовок поста" 
               value={post.title}
               onChange={e => setPost({...post, title: e.target.value})} 
            />
            <MyInput 
               type="text" 
               placeholder="Текст поста"
               value={post.body}
               onChange={e => setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={addNewPost}>Создать новый пост</MyButton>
         </form>
      </div>
   );
}
export default PostForm;