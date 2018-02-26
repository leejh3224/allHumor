import React from 'react'
import { Provider } from 'react-redux'
import Routes from 'pages/Routes'
import configureStore from 'store'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

export default App
