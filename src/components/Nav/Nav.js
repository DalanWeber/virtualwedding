import React from 'react'
import './Nav.css'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logout} from '../../redux/authReducer'
import {useLocation} from 'react-router-dom'
import axios from 'axios'

const Nav = (props) =>{
    const location = useLocation();
    const dispatch = useDispatch();
    const uselogout = () =>{
        axios.post('/api/auth/logout')
        .then(_ => {dispatch(logout())})
    }

    return location.pathname !== '/' &&
        <div className='nav'>
            <div>
                Welcome Guest
            </div>
    
                <ul>
                    <li>Create Post</li>
                    <li>Posts</li>
                    <li>Registry</li>
                    <li>Guest Book</li>
                    <li>Guests</li>
                </ul>

            <div>
                <Link to='/' onClick={uselogout}>LogOut</Link>
            </div>
        </div>
    
}

export default Nav