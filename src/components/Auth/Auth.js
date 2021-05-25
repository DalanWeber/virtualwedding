import React, { component } from "react";
import "./Auth.css";
import axios from 'axios'
import {useState}  from 'react'

import {setGuest} from '../../redux/authReducer'

import {useDispatch} from 'react-redux'

const Auth = (props) => {

  const [username, setUsername] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()

  return (
    <div className="auth">
      <div>LEFT Pictures</div>
      <div className="login">

          <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

        <div>
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
      <div>RIGHT Pictures</div>
    </div>
  );
};

export default Auth;
