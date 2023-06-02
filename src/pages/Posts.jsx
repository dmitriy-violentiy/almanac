import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
   const [posts, setPosts] = useState([])
   const [filter, setFilter] = useState({sort: '', query: ''})
   const [modal, setModal] = useState(false)
   const [totalPages, setTotalPages] = useState(0)
   const [limit, setLimit] = useState(5)
   const [page, setPage] = useState(1)
   const lastElement = useRef()

   const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

   const [fetchPosts, isPostsLoading, postError] = useFetching( async(limit, page) => {
      const response = await PostsService.getAll(limit, page)
      setPosts([...posts, ...response.data])
      const totalCount = (response.headers['x-total-count'])
      setTotalPages(getPageCount(totalCount, limit))
   })

   useObserver(lastElement, page < totalPages, isPostsLoading, () => {
      setPage(page + 1)
   })

   useEffect(() => {
      fetchPosts(limit, page)      
   }, [page, limit])

   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }

   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
   }

   const changePage = (page) => {
      setPage(page)
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
         <MySelect 
            value={limit}
            onChange={value => setLimit(value)}
            defaultValue='Количество элементов на странице'
            options={[
               {value: 5, name: '5'},
               {value: 10, name: '10'},
               {value: 25, name: '25'},
               {value: -1, name: 'Показать все'}
            ]}
         />
         {postError &&
            <h1>Произошла ошибка! ${postError}</h1>
         }
         <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts JS"} />
         <div ref={lastElement}></div>
         {isPostsLoading &&
            <Loader />
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
