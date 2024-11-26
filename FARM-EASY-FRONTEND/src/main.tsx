import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from "react-hot-toast"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Redux/Store';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="147025341454-gdjmi4v58n60cd1h82g84gs7rukmcjje.apps.googleusercontent.com">
          <App />
          <Toaster />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
)
