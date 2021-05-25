import React from "react";
import Nav from "./components/Nav/Nav.js";
import Footer from './components/Footer/Footer'
import routes from "./routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      {routes}
      <Footer/>
    </div>
  );
}

export default App;


