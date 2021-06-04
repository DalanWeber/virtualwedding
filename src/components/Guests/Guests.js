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
  return (
    <div className="guests">
      <div className="guestcard">
        <h2> Your Guestcard:</h2>
        <h5>Username: {guest?.username}</h5>
        <h5>Email: {guest?.email}</h5>
        <form>
        <FontAwesomeIcon icon="inbox" /> : <input
            type="email"
            placeholder="Update Email"
            value={email}
            required
            minlength="8"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button onClick={() => handleEdit()}>Save</button>
        </form>
      </div>
      {guest?.is_admin && <h1>Guestlist:</h1>}
      {guest?.is_admin &&
        guests.map((guest) => {
          return (
            <div className="guestlist">
              <Guest
                key={guest?.guest_id}
                guest={guest}
                catchUpdates={catchUpdates}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Guests;
