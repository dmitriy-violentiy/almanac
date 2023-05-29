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
               placeholder="Post naming" 
               value={post.title}
               onChange={e => setPost({...post, title: e.target.value})} 
            />
            <MyInput 
               type="text" 
               placeholder="Description post"
               value={post.body}
               onChange={e => setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={addNewPost}>Create post</MyButton>
         </form>
      </div>
   );
}
export default PostForm;