import './App.css'
import * as React from "react";

import {
  Home,
} from './Components/index'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path : "/",
    element:<div>
      <Home/>
    </div>
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
