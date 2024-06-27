import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/discover.tsx'
import './index.css'
import Router from './router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
