import React from 'react'
import './Welcome.css'
import photo from '../../photos/3L3A6977.jpg'

const Welcome = (props) =>{
    return(
        <div className='welcome'>
            <p>Thanks for attending! Take a look around using the links at the top of the screen!</p>
            <img src={photo} alt="a wedding photo"/>
        </div>
    )
}

export default Welcome