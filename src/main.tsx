import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './store';

// third-party
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ReduxProvider store={store}>
          <BrowserRouter basename="/">
              <App />
          </BrowserRouter>
      </ReduxProvider>
  </React.StrictMode>,
)
