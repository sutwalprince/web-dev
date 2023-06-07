import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const View = () => {

  let postId = useParams().postId;
  const [post ,setPost] = useState({});

  const getPost = async ()=>{
      const { data } = await axios.get(`/api/${postId}`);
      setPost(data.post);
      // console.log(post.text);
  }

  useEffect(()=>{
    getPost(); 
  },[])
  return (
    <>
      <div className="container">
        <h5>{post.name}</h5>
        <img src={post.image} alt="img" />
        <p>{post.text}</p>
      </div>
    </>
  )
}

export default View