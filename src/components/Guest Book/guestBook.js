import React from "react";
import "./guestBook.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GuestBook = (props) => {
  const { guest } = useSelector((store) => store.authReducer);
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState([]);
  const [sign, setSign] = useState(false);


  useEffect(() => {
    axios
      .get("/api/guestbook/read")
      .then((res) => {
        setEntries(res.data);
        
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreate = () => {
    axios
      .post("/api/guestbook/sign", { message })
      .then(() => {
        axios.get("/api/guestbook/read").then((res) => {
          setEntries(res.data);
        });
        setMessage("");
        setSign(false);
        console.log(entries)
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (entry_id) => {
    axios
      .delete(`/api/guestbook/delete/${entry_id}`)
      .then(() => {
        axios.get("/api/guestbook/read").then((res) => {
          setEntries(res.data);
        });
        setMessage("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="book">
      <div className="sigs">
        <h1>Guest Book </h1>
        {/* <img src={photo} alt="a wedding photo"/> */}
        {entries.map((entry) => {
          return (
            <div className="exactsigs" key={entry.entry_id}>
              <span className="signor">{entry.username}</span>
              <span className="signed">{entry.content && ` : ${entry.content}`}</span>

              {(entry.username === guest?.username || guest?.is_admin) && (
                <button onClick={() => handleDelete(`${entry.entry_id}`)}>
                  <FontAwesomeIcon icon="eraser" />
                </button>
              )}
            </div>
          );
        })}

        <div>
          {!sign && entries.findIndex((el)=>{
      return el.guest_id === guest?.guest_id
    })=== -1 && (
            <div className="signToggle">
              Sign Here{" "}
              <button onClick={() => setSign(true)}>
                <FontAwesomeIcon icon="pen-fancy" />
              </button>
            </div>
          )}
          {sign && (
            <div>
              <span className="optional">
                Enter an optional message to the couple <br /> and use the
                button to sign
              </span>
              <br />
              <span className="signor">{guest?.username}:</span>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your (optional) message to the bride and groom!"
                maxLength="124"
                size="40"
              />
              <button onClick={handleCreate}>
                <FontAwesomeIcon icon="signature" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// git add comment stuff
// git add comment stuff
export default GuestBook;
