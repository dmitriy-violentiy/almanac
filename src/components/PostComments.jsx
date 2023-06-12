import React, { useEffect, useState } from "react";
import "../styles/App.css"
import { useFetching } from "../hooks/useFetching";
import { useParams } from "react-router-dom";
import PostsService from "../API/postsService";
import Loader from "../components/UI/loader/Loader";

const PostComments = () => {
   const params = useParams()
   const [comments, setComments] = useState([])
   
   const [fetchComents, isComLoading, comError] = useFetching( async (id) => {
      const response = await PostsService.getCommentsByPostId(id)
      setComments(response.data)
   })
   
   useEffect(() => {
      fetchComents(params.id)
   }, [])

   return (
      <div className="post__info">

         <h2>Комментарии:</h2>
         {isComLoading
            ? <Loader />
            :  <div>
                  {comments.map((comm, index) =>
                     <div key={index}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                     </div>
                  )}
               </div>
         }
      </div>
   )
}

export default PostComments