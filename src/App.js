import React, { useEffect, useMemo, useState } from "react";
import "./styles/App.css"
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/myModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import axios from 'axios'
import PostService from "./API/postsService";
import Loader from "./components/UI/loader/Loader";

function App() {
   const [posts, setPosts] = useState([])
   const [filter, setFilter] = useState({sort: '', query: ''})
   const [modal, setModal] = useState(false)
   const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
   const [isPostsLoading, setIsPostsLoading] = useState(false)

   useEffect(() => {
      fetchPosts()      
   }, [])

   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }

   async function fetchPosts() {
      setIsPostsLoading(true)
      const posts = await PostService.getAll()
      setPosts(posts)
      setIsPostsLoading(false)
   }

   const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id))
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
         {isPostsLoading?<Loader/> :<PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts JS"} />

         }
            
      </div>
   );
}
export default App;
