import React,{useState} from 'react'
import './Login.css'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

const Login = () =>{
    const [login,loginhandler] = useState({  });
    const History = useHistory();
    const SUCCESS_LOGIN = "User details are correct";

    const changeHandler = (e) =>{
        loginhandler({...login,[e.target.name]:e.target.value});
        console.log(login);
    }

    const logincheck = async() =>{
        var login_data = new FormData();
        const email = login.email;
        const password = login.password;
        login_data.append('email',login.email);
        login_data.append('password',login.password);
        if(login.email === '' || login.password === ''){
            alert("Enter all the details");
        }
        else if(login.email === undefined || login.password === undefined){
            alert("Enter all the details");
        }
        else{
            // const response = await axios({
            //     url: "http://localhost:81/Booktheknowledge-backend/PHP/Login.php",
            //     method: "post",
            //     headers: {
            //       "Content-Type": "application/x-www-urlencoded",
            //     },
            //     data: login_data,
            // });
            

            const response = await axios({
                url: 'http://localhost:8000/login/' +email + '=' +password,
                method:'get',
                config:{
                    headers:{
                        'Content-Type' : 'multipart/form-data'
                    }
                }
            });
            if(response.data.status ==="true"){
                localStorage.setItem('email',login.email)
                History.push('/BookList')
            }
            else{
                alert(response.data.message)
                window.location.reload(false)
            }

        }
    }

    const register = () =>{
        History.push('/Register');
    }

    return(
        <div className="foo">
            <div>
                <br/>
                <img src="/logo.png" className="img"/>
                <br/>
                <br/>
            </div>
            <div className="login">
                <form autoComplete="off">
                <h3>LOGIN</h3>

                <h4>Email</h4><br/>
                <input type="text" name="email" className="input" onChange={changeHandler}/><br/>

                <h4>Password</h4><br/>
                <input type="password" name="password" className="input" onChange={changeHandler}/><br/><br/>

                <input type="button" value="Login" className="button" onClick={logincheck}/>

                <div className="registerbutton">
                    <p>Don't have an account? &nbsp;
                        <label onClick={register} style={{textDecoration:"underline"}}><b>Register</b></label>
                    </p>
                </div>

            </form>
            </div>
            
        </div>
    )
}

export default Login;