import React, { useMemo, useState } from "react";
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

function App() {
   const [posts, setPosts] = useState([
      {id: 1, title: "aa", body: "qq"},
      {id: 2, title: "cc", body: "ss"},
      {id: 3, title: "bb", body: "zz"}
   ])

   const [filter, setFilter] = useState({sort: '', query: ''})
   const [modal, setModal] = useState(false)
   const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

   const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)
   }

   async function fetchPosts() {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(response.data)
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
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Posts JS"} />
      </div>
   );
}
export default App;
