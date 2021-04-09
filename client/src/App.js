import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useRoutes} from './routes'
import { AuthContext } from './context/AuthContext'

function App() {
  const routes = useRoutes()
  

  return (
    
      <Router>
          {routes}
        </Router>
  );
}

export default App;
