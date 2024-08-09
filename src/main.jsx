import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "../src/store/store.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Pages
import { AddPost, AllPosts, EditPost, Home, Login, Post, Signup } from "./pages/index.js"
import Protected from './components/AuthLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            {/* {" "} Pointer to Ponder */}
            <AllPosts />
          </Protected>
        )
      },
      {
        path: "/post/:slug",
        element: <Post/>
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            <AddPost/>
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            {/* {" "} Pointer to Ponder */}
            <EditPost/>
          </Protected>
        )
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  // </React.StrictMode>
)
