import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import EditButton from '../img/editButton.jpeg'
import deleteButton from '../img/delete.jpeg'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'

const Single = () => {

  const [post,setPost] = useState([]);

  const location =  useLocation(); //For fetching URL :- #react-router-dom , we are using useLocation() $hook

  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2]        // Extracting the postId from the URL

  const {currentUser}=useContext(AuthContext)

  useEffect(()=>{
    const fetchData =  async ()=>{
      try {
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data)
      } catch (err) {
        console.log(err) 
      }
    }
    fetchData()             // We are creating fechData as a function, because we can't use async function directly in useEffect
  },[postId]); 

  const handleDelete =  async ()=>{
   // console.log(`${postId}`)
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log("delete issues",err) 
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='single'>
      <div className="content"> 
        <img src={`../upload/${post.img}`} alt="" />

        <div className="user">
          {post.userImg && <img src={`../upload/${currentUser?.img}`} alt="" />}

          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()} </p>           {/* We are using moment library for getting the time whenever the post is created*/} 
          </div>
          {currentUser?.username===post.username && <div className="edit">
          <Link to={`/write?edit=2`} state={post}>
            <img src={EditButton} alt="" id='editbutton'/>
          </Link>
          <img onClick={handleDelete} src={deleteButton} alt="" id='deletebutton'/>
           </div>}
         </div>
        <h1>{post.title}</h1>
        <p> {getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single