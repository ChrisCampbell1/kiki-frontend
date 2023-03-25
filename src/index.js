import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import { Suspense } from 'react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Suspense fallback={<h1>Loading...</h1>}>
          <App />
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>
)
