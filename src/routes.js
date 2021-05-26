import {Switch, Route}  from 'react-router-dom'
import React from 'react'

import Auth from './components/Auth/Auth.js'
import Welcome from './components/Welcome/Welcome.js'
import Create_Post from './components/Create Post/Create_Post.js'


export default(
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/welcome' component={Welcome}/>
        <Route path='/create_post' component={Create_Post}/>
    </Switch>
)