import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from '../Router/router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider> 
        <Toaster />
      <RouterProvider router={router} /> </AuthProvider>
  </StrictMode>,
)
