import React from 'react'
import './Create_Post.css'
import axios from 'axios'
import {useState} from 'react'


const Create_Post = (props) =>{
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')

  const handleCreate = () => {
    axios.post('/api/post/create', {title,image,content})
    .then(() => {
      console.log('replace this string with something useful')
      props.history.push('/welcome')
  })
    .catch((err) => console.log(err))
    
  }
    return(
        <div className="create">
            <h2>Create a Memory!</h2>
        <div className='form-main'>
          <div className='form-input-box'>
            <p>Title:</p>
            <input value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div className='form-input-box'>
            <p>Image URL:</p>
            <input value={image} onChange={(e)=>setImage(e.target.value)}/>
          </div>
          <div className='form-text-box'>
            <p>Content:</p>
            <textarea value={content} onChange={(e)=>setContent(e.target.value)}/>
          </div>
        </div>
        <button onClick={handleCreate}>Post</button>
        </div>
    )
}

export default Create_Post