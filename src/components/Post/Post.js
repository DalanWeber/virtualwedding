import { useState } from "react";
import axios from "axios";
import React from "react";
import "./Post.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { v4 as randomString } from 'uuid';

const Post = (props) => {
  const { guest } = useSelector((store) => store.authReducer);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isUploading, setisUploading] = useState(false)

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
  const getSignedRequest = ([file]) => {
    setisUploading(true);
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get('/api/signs3', {
        params: {
          'file-name': fileName,
          'file-type': file.type,
        },
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        setisUploading(false);
        setImage(`${url}`)
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch(err => {
        setisUploading(false);
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };
  console.log(props)
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
                                      <Dropzone
          onDropAccepted={getSignedRequest}
          accept="image/*"
          multiple={false}>
          {({getRootProps, getInputProps}) => (
            <div className='dropbox'

              {...getRootProps()}>
              <input {...getInputProps()} />
              {isUploading ? <GridLoader /> : <p>Drop file here, or click to select files</p>}
            </div>
          )}
         </Dropzone>
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
          <img src={props.post.img} alt="" />
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
              <div>
              <button
                onClick={() =>
                  props.addCheers("cheers", `${props.post.post_id}`)
                }
              >
                <FontAwesomeIcon icon="heart" />
              </button>Cheers: {props.post.cheers}</div>
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
