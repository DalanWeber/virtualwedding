import React, { useState, useEffect } from 'react'
import './Nav.scss'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../redux/authReducer'
import {setGuest} from '../../redux/authReducer'
import {useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



import axios from 'axios'

const Nav = (props) =>{
    const location = useLocation();
    const dispatch = useDispatch();
    const {guest} = useSelector((store) => store.authReducer)
    
    const [showMenu, setShowmenu] = useState(false)
    
    useEffect(()=>{
        axios.get('/api/auth/guest')
        .then((res)=>{
        dispatch(setGuest(res.data))  
        })
        .catch((err) => console.log(err));
    },[dispatch])
    
    
    const uselogout = () =>{
        axios.post('/api/auth/logout')
        .then(_ => {
            dispatch(logout())
            setShowmenu(false)
        })
    }

    return (location.pathname !== '/' && location.pathname !== '/logout') &&
        <div className='nav'>
            <div>
                Welcome {guest?.username}!
            </div>
            
                <ul className='nav-main'>
{guest?.is_admin && <Link to='/create_post'><button><li>Create Post</li></button></Link>}
                    <Link to='/posts'><button><li>Posts</li></button></Link>
                    <Link to='/guestbook'><button><li>Guest Book</li></button></Link>
                    <Link to='/guests'><button><li>Guest Info</li></button></Link>
                </ul>
                <ul className={`nav-drop ${showMenu ? 'show' : ''}`}>
{guest?.is_admin && <Link to='/create_post'onClick={() => setShowmenu(!showMenu)}><li>Create Post</li></Link>}
                    <Link to='/posts'onClick={() => setShowmenu(!showMenu)}><li>Posts</li></Link>
                    <Link to='/guestbook'onClick={() => setShowmenu(!showMenu)}><li>Guest Book</li></Link>
                    <Link to='/guests'onClick={() => setShowmenu(!showMenu)}><li>Guest Info</li></Link>
                    <Link to='/logout' onClick={uselogout}><button><FontAwesomeIcon icon="sign-out-alt" /></button></Link>
                </ul>
            <div className='nav-main' >
                <Link to='/logout' onClick={uselogout}><button><FontAwesomeIcon icon="sign-out-alt" /></button></Link>
            </div>
            <button onClick={() => setShowmenu(!showMenu)} className='burger'><FontAwesomeIcon icon="bars" /></button>
            
        </div>
    
}

export default Nav