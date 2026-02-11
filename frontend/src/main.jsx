import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import {Provider} from "react-redux";
import {store} from "./utils/store.js";
import {ToastContainer} from "react-toastify";
import Login from "./pages/login.jsx";
import Profile from "./pages/profile.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements (
    <Route path='/' element={<App/>} >
      <Route index={true}  element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/updateProfile' element={<UpdateProfile/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
   <ToastContainer/>
   <RouterProvider router={router} />
 </Provider>
)