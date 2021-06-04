import {Switch, Route}  from 'react-router-dom'
import React from 'react'

import Auth from './components/Auth/Auth.js'
import Welcome from './components/Welcome/Welcome.js'
import Create_Post from './components/Create Post/Create_Post.js'
import Posts from './components/Posts/Posts.js'
import GuestBook from './components/Guest Book/guestBook.js'
import Logout from './components/Logout/Logout'
import Guests from './components/Guests/Guests'

export default(
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/welcome' component={Welcome}/>
        <Route path='/create_post' component={Create_Post}/>
        <Route path='/posts' component={Posts}/>
        <Route path='/guestbook' component={GuestBook}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/guests' component={Guests}/>
    </Switch>
)