import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import * as serviceWorker from './serviceWorker'
import reportWebVitals from './reportWebVitals'
import configureStore from './store/configureStore'
import 'react-toastify/dist/ReactToastify.css'
import './assets/css/welcome.css'
import './assets/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

const store = configureStore()
const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route path='/' component={App} />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
serviceWorker.unregister()
