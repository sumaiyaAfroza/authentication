import React from 'react';
import Header from "./component/Header.jsx";
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