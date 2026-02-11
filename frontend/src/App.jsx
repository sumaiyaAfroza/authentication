import React from 'react';
import Header from "./components/Header.jsx";
import {Outlet} from "react-router";


const App = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );
};

export default App;