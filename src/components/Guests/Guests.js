import React from "react";
import "./Guests.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Guest from "../Guest/Guest";
import { setGuest } from "../../redux/authReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Guests = (props) => {
  const [guests, setGuests] = useState([]);
  const [email, setEmail] = useState("");
  const [maillist, setMaillist] = useState('');
  const [mailbody, setMailbody] = useState('');
  
  const { guest } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/guests/read")
      .then((res) => {
        setGuests(res.data);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const handleEdit = () => {
    axios
      .put("/api/guests/edit", {
        email: email || guest?.email,
        guest_id: guest.guest_id,
      })
      .then((res) => {
        setEmail("");
        catchUpdates();
        dispatch(setGuest(res.data));
      })
      .catch((err) => console.log(err));
  };

  const catchUpdates = () => {
    axios
      .get("/api/guests/read")
      .then((res) => {
        setGuests(res.data);
      })
      .catch((err) => console.log(err));
  };
  const sendEmail = () => {
    axios
      .put('/api/guest/send',{
        list: maillist,
        body: mailbody,
      })
      .then((res) => {
        alert('Message Sent')
        setMaillist('');
        setMailbody('');
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="guests">
      <div className="guestcard">
        <h2> Your Guestcard:</h2>
        <h5>Username: {guest?.username}</h5>
        <h5>Email: {guest?.email}</h5>
        <form>
          <FontAwesomeIcon icon="inbox" /> :{" "}
          <input
            type="email"
            placeholder="Update Email"
            value={email}
            required
            
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button onClick={() => handleEdit()}>Save</button>
        </form>
      </div>
      <div className="messaging">
        <div className="guestcards">
          {guest?.is_admin && <h1>Guestlist:</h1>}
          {guest?.is_admin &&
            guests.map((guest) => {
              return (
                <div className="guestlist" key={guest?.guest_id}>
                  <Guest
                    
                    guest={guest}
                    catchUpdates={catchUpdates}
                  />
                </div>
              );
            })}
        </div>
        <div className="message">
          {guest?.is_admin && <h1>Send Message:</h1>}
          {guest?.is_admin && (
            <div className="messagebody">
              To:{" "}
              <input
                value={maillist}
                onChange={(e)=>{setMaillist(e.target.value)}}
                placeholder='email(s)'
                onClick={() =>
                  alert(
                    `
              Enter an indvidual email! 
              EXAMPLE: example@email.com

              To enter multiple emails, seperate each
              email with a , to allow the system to read each individual
              email address!
              EXAMPLE: example@email.com , example2@email.com
              `
                  )
                }
              />{" "}
              <br />
              Message: <br />
              <textarea 
                value={mailbody}
                onChange={(e)=>{setMailbody(e.target.value)}}
              />
              <button onClick={()=>sendEmail()}>Send</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guests;
