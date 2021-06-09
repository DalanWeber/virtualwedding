import React from 'react'
import './Welcome.scss'

const Welcome = (props) =>{
    return(
        <div className='welcome'>
            <p className='welcomemessage'>Thanks for coming! Take a look around using the menu at the top of the screen! Use the Guest Info link to update your email to recieve updates via email!<br/>
            <span className='disclaimer'>(in the future, this could be an invite page)</span></p>

        </div>
    )
}

export default Welcome