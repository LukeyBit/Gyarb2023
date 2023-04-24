import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

/**
 * 
 * Creates the root element in the public html, adds the store to the application, adds the router parent element
 * and renders the App component inside it.
 * 
 */

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter active='true' >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)