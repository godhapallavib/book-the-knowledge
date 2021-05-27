import React from 'react'
import './Header.css'
import {useHistory} from 'react-router-dom'

const Header = () =>{
    const History = useHistory();

    const logout = () =>{
        localStorage.clear();
        History.push('/')
    }
    return(
        <div>
            <div className="row">
            <div className="col">
                <img src="./logo.png" className="logoimg"/>
            </div>
            <div className="col">
                <input type="button" value="Logout" className="logoutbutton"
                  onClick={logout}/>
            </div>
            </div>
        </div>
    )
}

export default Header;