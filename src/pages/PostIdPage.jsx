import React, { useEffect, useState } from "react";
import "../styles/App.css"
import { Link, useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostsService from "../API/postsService";
import Loader from "../components/UI/loader/Loader";
import PostComments from "../components/PostComments";
import MyButton from "../components/UI/button/MyButton";
import avatar from "../img/avatar.png"

const PostIdPage = () => {
   const params = useParams()
   const [post, setPost] = useState({})
/*    const [comments, setComments] = useState([]) */
   
      const [fetchPostById, isLoading, error] = useFetching( async (id) => {
      const response = await PostsService.getById(id)
      setPost(response.data)
   })
 
   /* const [fetchComents, isComLoading, comError] = useFetching( async (id) => {
      const response = await PostsService.getCommentsByPostId(id)
      setComments(response.data)
   }) */
   
   useEffect(() => {
      fetchPostById(params.id)
      /* fetchComents(params.id) */
   }, [])

   return (
      <div className="post__info">
         <div className="post__info_body">
            <Link to="/posts"><MyButton>Назад</MyButton></Link>
            
            {isLoading 
               ? <Loader />
               :<div className="post__info_text">
                  <div className="post__info_avatar"><img src={avatar} alt="" /></div>
                  <div>
                     <h2>Пост:</h2>
                     <b>{post.title}</b>
                     <div>{post.body}</div>   
                  </div>
               </div>
            }
         </div>
         
         <PostComments />
      </div>
   )
}

export default PostIdPage