import React from 'react'
import { useHistory } from 'react-router';

const NotLoggedIn = () =>{
    const History = useHistory();

    const login = () =>{
        History.push('/');
    }

    return(
        <div>
            <p style={{marginTop:"1rem"}}>Please login to continue. 
                <b style={{textDecoration:"underline"}} onClick={login}>Login</b>
            </p>
        </div>
    )
}

export default NotLoggedIn;