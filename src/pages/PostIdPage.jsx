import React, { useEffect, useState } from "react";
import "../styles/App.css"
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostsService from "../API/postsService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {
   const params = useParams()
   const [post, setPost] = useState({})
   const [comments, setComments] = useState([])
   
   const [fetchPostById, isLoading, error] = useFetching( async (id) => {
      const response = await PostsService.getById(id)
      setPost(response.data)
   })
   const [fetchComents, isComLoading, comError] = useFetching( async (id) => {
      const response = await PostsService.getCommentsByPostId(id)
      setComments(response.data)
   })
   
   useEffect(() => {
      fetchPostById(params.id)
      fetchComents(params.id)
   }, [])

   return (
      <div className="post__info">
         <div className="post__info_body">
            <h2>Страница поста c ID = {params.id}</h2>
            {isLoading 
               ? <Loader />
               :<div>{post.id}. {post.title}</div>
            }
         </div>
         

         <h2>Комментарии:</h2>
         {isComLoading
            ? <Loader />
            :  <div>
                  {comments.map(comm =>
                     <div>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                     </div>
                  )}
               </div>

         }
      </div>
   )
}

export default PostIdPage