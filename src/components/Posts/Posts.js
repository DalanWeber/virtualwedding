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
  const handleDelete = (post_id) => {
    axios
      .delete(`/api/posts/delete/${post_id}`)
      .then((res) => {
        axios.get("api/posts/read").then((res) => {
          setPosts(res.data);
        });
        // console.log('that was the issue')
      })
      .catch((err) => console.log(err));
  };
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
          <div className="post">
            <Post
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

export default Posts;
