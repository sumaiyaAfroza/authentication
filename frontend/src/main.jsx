import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router";
import HomeScreen from "./component/home.screen.jsx";
import Register from "./pages/register.jsx";
import {Provider} from "react-redux";
import {store} from "../utils/store.js";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path={'/'} element={<HomeScreen/>} />
      <Route path={'/register'} element={<Register/>} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(

    <Provider store={store} >
      <RouterProvider router={router}/>
    </Provider>


)
