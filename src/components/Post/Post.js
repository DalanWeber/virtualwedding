import { useState } from "react";
import axios from "axios";
import React from "react";
import "./Post.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Post = (props) => {
  const { guest } = useSelector((store) => store.authReducer);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleEdit = () => {
    axios
      .put("api/posts/update", {
        title: title || props.post.title,
        image: image || props.post.img,
        content: content || props.post.content,
        post_id: props.post.post_id,
      })
      .then((res) => {
        setTitle("");
        setContent("");
        setImage("");
        setEdit(false);
        props.catchUpdates();
      })
      .catch((err) => console.log(err));
  };
  return edit ? (
    <div>
      <div>
        <div>
          <div className="postcontent">
            <h2>{props.post.title}</h2>
            <span className="content">{props.post.content} </span>
            <img src={props.post.img} alt="a beautiful day" />
            <div className="buttons">
              {guest?.is_admin && (
                <button onClick={() => setEdit(!edit)}>
                  <FontAwesomeIcon icon="wrench" />
                </button>
              )}
              {guest?.is_admin && (
                <button
                  onClick={() => props.handleDelete(`${props.post.post_id}`)}
                >
                  <FontAwesomeIcon icon="trash" />
                </button>
              )}
              <div>
                Cheers: {props.post.cheers}
                <button
                  onClick={() =>
                    props.addCheers("cheers", `${props.post.post_id}`)
                  }
                >
                  <FontAwesomeIcon icon="heart" />
                </button>
                </div>
                <br/>
                <br/>
                <h2>Edit Post</h2>
                <div className="form-input-box">
                  <p>Title:</p>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength="50"

                    placeholder={props.post.title}
                  />
                </div>
                <div className="form-input-box">
                  <p>Image URL:</p>
                  <input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    maxLength="250"

                    placeholder={props.post.img}
                  />
                </div>
                <div className="form-text-box">
                  <p>Content:</p>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength="500"
                    size="500"
                    placeholder={props.post.content}
                  />
                </div>
                <br />
                <button onClick={() => handleEdit()}>Save</button>
              
            </div>
          </div>
        </div>
        <div>
          <br />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div>
        <div className="postcontent">
          <h2>{props.post.title}</h2>
          <span className="content">{props.post.content} </span>
          <img src={props.post.img} alt="a beautiful day" />
          <div className="buttons">
            {guest?.is_admin && (
              <button onClick={() => setEdit(true)}>
                <FontAwesomeIcon icon="wrench" />
              </button>
            )}
            {guest?.is_admin && (
              <button
                onClick={() => props.handleDelete(`${props.post.post_id}`)}
              >
                <FontAwesomeIcon icon="trash" />
              </button>
            )}
            <div>
              Cheers: {props.post.cheers}
              <button
                onClick={() =>
                  props.addCheers("cheers", `${props.post.post_id}`)
                }
              >
                <FontAwesomeIcon icon="heart" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <br />
      </div>
    </div>
  );
};

export default Post;

//{title: title || props.post.title}
