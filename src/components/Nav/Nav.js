import React, {component} from 'react'
import './Nav.css'

const Nav = (props) =>{
    return(
        <div className='nav'>
            <div>
                Welcome Guest
            </div>
    
                <ul>
                    <li>Posts</li>
                    <li>Guest Book</li>
                    <li>Registry</li>
                    <li>Guests</li>
                </ul>

            <div>
                LogOut
            </div>
        </div>
    )
}

export default Nav