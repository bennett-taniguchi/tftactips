import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Auth0Provider} from '@auth0/auth0-react'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

const domain = import.meta.env.VITE_AUTH0DOMAIN!
const clientId = import.meta.env.VITE_AUTH0CLIENTID!
 console.log(domain,clientId)
createRoot(document.getElementById('root')!).render(
  <StrictMode >
   <BrowserRouter>
   <Auth0Provider domain={domain} clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <App />
    </Auth0Provider>
    </BrowserRouter>
  </StrictMode>,
)
