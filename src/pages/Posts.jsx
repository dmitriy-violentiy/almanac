import React, { useEffect, useMemo, useState } from "react";
import "../styles/App.css"
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/myModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostsService from "../API/postsService";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../components/utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
   const [posts, setPosts] = useState([])
   const [filter, setFilter] = useState({sort: '', query: ''})
   const [modal, setModal] = useState(false)
   const [totalPages, setTotalPages] = useState(0)
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(1)

   const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

   const [fetchPosts, isPostsLoading, postError] = useFetching( async(limit, page) => {
      const response = await PostsService.getAll(limit, page)
      setPosts(response.data)
      const totalCount = (response.headers['x-total-count'])
      setTotalPages(getPageCount(totalCount, limit))
   })

   useEffect(() => {
      fetchPosts(limit, page)      
   }, [])

   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }

   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
   }

   const changePage = (page) => {
      setPage(page)
      fetchPosts(limit, page)
   }

   return (
      <div className="App">
         <button onClick={fetchPosts}>get posts</button>
         <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
            Создать пользователя
         </MyButton>
         <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
         </MyModal>
         <PostFilter
            filter={filter} 
            setFilter={setFilter} 
         />
         {postError &&
            <h1>Произошла ошибка! ${postError}</h1>
         }
         {isPostsLoading ?
            <Loader /> :
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts JS"} />
         }

         <Pagination 
            page={page} 
            changePage={changePage} 
            totalPages={totalPages} 
         />
         
            
      </div>
   );
}
export default Posts;
