import React from "react";
import "./Guest.scss";
import axios from "axios";


const Guest = (props) => {
  const makeAdmin = () => {
    axios.put("/api/guests/edit", {
      is_admin: true,
      guest_id: props.guest.guest_id,
    })
    .then((res) => {
      props.catchUpdates();
    })
      .catch((err) => console.log(err))
  }
  const removeAdmin = (is_admin) => {
    console.log('click')
    axios
      .put("/api/guests/edit", {
      is_admin: false,
      guest_id: props.guest.guest_id,
    })      
      .then((res) => {
      props.catchUpdates();
      console.log('something is happening')
    })
      .catch((err) => console.log(err))
  };

  return (
    <div className="guesslist">
      <div>
        Username: {props.guest.username}
        <br />
        Email: {props.guest.email && `${props.guest.email}`}
        <br />
        Admin: {`${props.guest.is_admin}`}
        <br />
        {!props.guest.is_admin && <button onClick={() => makeAdmin()}>Make Admin</button>}
        {props.guest.is_admin &&<button onClick={() => removeAdmin()}>Remove Admin</button>}
      </div>
    </div>
  );
};

export default Guest;
