import React from "react";
import Nav from "./components/Nav/Nav.js";
import Footer from './components/Footer/Footer'
import routes from "./routes";
import "./App.scss";
import { library } from '@fortawesome/fontawesome-svg-core'
import {useLocation} from 'react-router-dom'

import {faEraser, faPenFancy, faSignature, faBars, faSignOutAlt, faInbox, faWrench, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faEraser, faSignature, faPenFancy, faBars, faSignOutAlt, faInbox, faWrench, faTrash, faHeart)

function App() {
  const location = useLocation();
  
  return (
    <div className="App">
      {location.pathname !== '/' && location.pathname !== '/logout' && <Nav />}
      {routes}
      <Footer/>
    </div>
  );
}

export default App;


