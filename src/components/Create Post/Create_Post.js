import React from "react";
import "./Create_Post.scss";
import axios from "axios";
import { useState } from "react";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";

const Create_Post = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [isUploading, setisUploading] = useState(false);

  const handleCreate = () => {
    axios
      .post("/api/post/create", { title, image, content })
      .then(() => {
        props.history.push("/Posts");
      })
      .catch((err) => console.log(err));
  };

  const getSignedRequest = ([file]) => {
    setisUploading(true);
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get("/api/signs3", {
        params: {
          "file-name": fileName,
          "file-type": file.type,
        },
      })
      .then((response) => {
        const { signedRequest, url } = response.data;
        uploadFile(file, signedRequest, url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then((response) => {
        setisUploading(false);
        setImage(`${url}`);
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch((err) => {
        setisUploading(false);
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  return (
    <div className="create">
      <div className="form-main">
        <h2>Create a Memory!</h2>
        <div className="form-input-box">
          <p>Title:</p>
          <input
            placeholder="Enter a Title for your post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="50"
          />
        </div>
        <br />
        <div className="form-input-box">
          <p>Image URL:</p>
          <input
            placeholder="Enter URL here or upload a file below"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            maxLength="250"
          />
          <Dropzone
            onDropAccepted={getSignedRequest}
            accept="image/*"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="dropbox" {...getRootProps()}>
                <input {...getInputProps()} />
                {isUploading ? (
                  <GridLoader />
                ) : (
                  <p>Drop file here, or click to select files</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <br />
        <br />
        <div className="form-text-box">
          <p>Content:</p>
          <textarea
            placeholder="Jot down a few thoughts or comments about this memory"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength="500"
          />
        </div>
        <button onClick={handleCreate}>Post</button>
      </div>
    </div>
  );
};

export default Create_Post;
