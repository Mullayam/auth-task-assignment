"use strict";
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/web'
import { Provider } from 'react-redux'
import { store } from './store'
import { Toaster } from 'react-hot-toast'
import { notification } from 'antd';
function App() {
  const [_, contextHolder] = notification.useNotification();
  return (
    <React.StrictMode>
      <React.Fragment>
        {contextHolder}
        <Toaster />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </React.Fragment>
    </React.StrictMode>
  )
}

export default App
