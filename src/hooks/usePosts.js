import { useMemo } from "react"

//функция отработает, если только будут изменено то, что находится в зависимостях
export const useSortedPosts = (posts, sort) => {
   const sortedPosts = useMemo(() => {
      if(sort) {
         return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
      }
      return posts
   }, [sort, posts])

   return sortedPosts
}

export const usePosts = (posts, sort, query) => {
   //осуществили поиск с помощью фильтации
   const sortedPosts = useSortedPosts(posts, sort)
   const sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(query))
   }, [query, sortedPosts])

   return sortedAndSearchedPosts
}