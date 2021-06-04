import React from 'react'
import './Logout.scss'
import {Link} from 'react-router-dom'

const Logout = (props) =>{
    return(
        <div className='logout'>
            <p className='logoutmessage'>Thanks for coming! <br/>
            Click <Link to='/'>here</Link> to log back in</p>
            
        </div>
    )
}

export default Logout