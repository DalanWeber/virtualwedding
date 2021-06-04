import React from "react";
import "./Auth.scss";
import axios from "axios";
import { useState } from "react";
import { setGuest } from "../../redux/authReducer";
import { useDispatch } from "react-redux";


const Auth = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleRegister = () => {
    axios
      .post("/api/auth/register", { username, password })
      .then((res) => {
        dispatch(setGuest(res.data));
        props.history.push("/welcome");
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = () => {
    axios
      .post("/api/auth/login", { username, password })
      .then((res) => {
        dispatch(setGuest(res.data));
        props.history.push("/welcome");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth">
      <div></div>
      <h1 className="header">We're engaged!</h1>
      <div></div>
      <div className="login">
        <h2>And you're invited to the wedding!</h2>
        <h3>Please login below to attend!</h3>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <button onClick={handleLogin}>
            Login
          </button>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
