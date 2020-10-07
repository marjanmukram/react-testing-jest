import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import Link from './Link';
import CheckboxWithLabel from "./CheckboxWithLabel";
import FavoriteNumber from "./favorite-number/favorite-number";
import ReactRouterLinks from "./react-router-links/react-router-links";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        {/* <Link>www.myname.com</Link> */}
        <CheckboxWithLabel labelOn={"Checked"} labelOff={"Unchecked"} />
        <FavoriteNumber />
      </header>
    </div>
  );
}

export default App;
