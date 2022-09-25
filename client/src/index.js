import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Employees from './components/Employees'
import Home from './components/Home'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/employees' component={Employees} />
    </Switch>
  </Router>,
  document.getElementById('root')
)
