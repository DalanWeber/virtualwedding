import {Switch, Route}  from 'react-router-dom'
import React from 'react'

import Auth from './components/Auth/Auth.js'
import Welcome from './components/Welcome/Welcome.js'


export default(
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/welcome' component={Welcome}/>
    </Switch>
)