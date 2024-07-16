import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  // Create Post State
  const [posts,setPosts] = useState([])

  const cat =  useLocation().search //For fetching URL :- #react-router-dom , we are using useLocation() $hook

  useEffect(()=>{
    const fetchData =  async ()=>{
      try {
        const res = await axios.get(`/posts/${cat}`)          //posts ==
        setPosts(res.data)
      } catch (err) {
        console.log(err) 
      }
    }
    fetchData()             // We are creating fechData as a function, because we can't use async function directly in useEffect
  },[cat]);                 // Whenever I can category again and again, it will fire this function 

  // const posts = [
  //   {
  //     "id": 1,
  //     "title": "Lorem Ipsum",
  //     "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     "img": "https://img.freepik.com/premium-psd/quote-box-frame-background-empty-space-blogging-template-3d-render-concept-texting_492780-1797.jpg"
  //   },
  //   {
  //     "id": 2,
  //     "title": "Dolor Sit Amet",
  //     "desc": "Dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     "img": "https://img.freepik.com/premium-psd/quote-box-frame-empty-space-blog-template-blue-background-3d-render-concept-text-presentation_492780-1800.jpg"
  //   },
  //   {
  //     "id": 3,
  //     "title": "Adipiscing Elit",
  //     "desc": "Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     "img": "https://img.freepik.com/premium-psd/quote-box-frame-background-empty-space-blogging-template-3d-render-concept-texting_492780-1797.jpg"
  //   },
  //   {
  //     "id": 4,
  //     "title": "Consectetur",
  //     "desc": "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     "img": "https://img.freepik.com/premium-psd/quote-box-frame-empty-space-blog-template-blue-background-3d-render-concept-text-presentation_492780-1800.jpg"
  //   }
  // ]

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  
  return (
    <div className='home'>
      <div className="posts">
        {
          posts.map(post=>(
            <div className='post' key={post.id}>
              <div className='img'>
                <img src={`../upload/${post.img}`} alt=''/>
              </div>
              <div className='content'>
                <Link className='link' to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                  <p>{getText(post.desc)}</p>
                  <button>Read more</button>
                </Link>
                </div>
              </div>
          ))
        }
      </div>
    </div>

  )
}

export default Home