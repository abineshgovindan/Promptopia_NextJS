'use client';

import { useEffect, useState } from "react";

import PromptCard from "./PromptCard";





const PromptCardList = ({data, handleTagClick})=>{
  return (
    <div className="mt-16 prompt_layout">
       {/* {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))} */}
  
      {data.map((post)=>(
        
     
         <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
          
      ))}
    </div>
  )
} 


const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  //search state
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const fetchPost = async ()=>{
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setAllPosts(data)
     
    }

  useEffect(()=>{
     fetchPost();

  },[]);
  
  
  const  filterPrompt = (searchText) => {
    const regex = new RegExp(searchText, 'i');
    return allPosts.filter((item)=> 
    regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)
    
    );
  };


  const handleSearchChange =(e) =>{
     clearTimeout(searchTimeout);
     setSearchText(e.target.value);
     //debounce method
     setSearchTimeout(()=>{
      const searchResult = filterPrompt(e.target.value);
      setSearchResult(searchResult);
     },500)

  }

  const handleTagClick = (tagname) =>{
    setSearchText(tagname);
    const searchResult = filterPrompt(tagname);
    setSearchResult(searchResult);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
        type="text"
        placeholder="Search for tag or username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
        />

      </form>
      {searchText ? (
      <PromptCardList
      
        data={searchResult}
        handleTagClick={handleTagClick}

      />

      ):(
        <PromptCardList data={allPosts} handleTagClick={handleTagClick}/>

      )}

      

    </section>
  )
}

export default Feed;