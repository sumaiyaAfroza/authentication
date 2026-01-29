import React from 'react';

import {Outlet} from "react-router";
import Header from "./component/Header.jsx";

const App = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      
    </div>
  );
};

export default App;