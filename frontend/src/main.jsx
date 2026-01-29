import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router";
import HomeScreen from "./component/home.screen.jsx";
import Register from "./pages/register.jsx";
import {Provider} from "react-redux";
import {store} from "../utils/store.js";
import {ToastContainer} from "react-toastify";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import UpdateProfile from "./pages/updateProfile.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path={'/'} element={<HomeScreen/>} />
      <Route path={'/register'} element={<Register/>} />
      <Route path={'/login'} element={<Login/>}/>
      <Route path={'/profile'} element={<Profile/>}/>
      <Route path={'/updateProfile'} element={<UpdateProfile/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
    <Provider store={store} >
      <ToastContainer/>
      <RouterProvider router={router}/>
    </Provider>
)
