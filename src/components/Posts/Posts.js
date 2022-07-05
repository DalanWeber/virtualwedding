import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import "./Posts.scss";
import Post from "../Post/Post";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("api/posts/read")
      .then((res) => {
        setPosts(res.data);
        // console.log('is this looping')
        // turns out it was looping
      })
      .catch((err) => console.log(err));
  }, []);

  const addCheers = (cheers, post_id) => {
    axios
      .put("api/posts/update", { cheers, post_id })
      .then((res) => {
        axios.get("api/posts/read").then((res) => {
          setPosts(res.data);
        });
        // console.log('that was the issue')
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (post_id, img) => {
    axios
      .delete(`/api/posts/delete/${post_id}`)
      .then((res) => {
        axios.get("api/posts/read").then((res) => {
          setPosts(res.data);
          // s3delete()
          // console.log(img)
          // console.log(post_id)
        });
        // console.log('that was the issue')
      })
      .catch((err) => console.log(err));
  };
  // const s3delete = () =>{
  //   // let key = image.substring(43)

  //   let key = 'f1735014-9831-4f51-931e-4fcd83eec776-3L3A7607.jpg'
  //   axios
  //   .put('/api/deletes3', {
  //     params: {
  //       'key': key
  //     }
  //   })
  //   .then((res)=> console.log('it worked'))
  //   .catch((err) => console.log(err))
  // }
  const catchUpdates = () => {
    axios
      .get("api/posts/read")
      .then((res) => {
        setPosts(res.data);
        // console.log('is this looping')
        // turns out it was looping
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="posts">
      {posts.map((post) => {
        return (
          <div className="post" key={post.post_id}>
            <Post
              key={post.post_id}
              post={post}
              catchUpdates={catchUpdates}
              addCheers={addCheers}
              handleDelete={handleDelete}
            />
            {/* <div>
              Cheers: {post.cheers}
              <button onClick={() => addCheers("cheers", `${post.post_id}`)}>
                YAY!
              </button>
              <button onClick={() => handleDelete(`${post.post_id}`)}>X</button>
            </div> */}
          </div>
        );
      })}
      {/* <img src={photo} alt="a wedding photo"/> */}
    </div>
  );
};
//aslkdjflkasdf
satdjglksadlkfjldsa;kfdjlasdk;fdj asld;kfjsa
export default Posts;

