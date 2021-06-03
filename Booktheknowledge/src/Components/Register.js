import React,{useState} from 'react'
import './Register.css'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

const Register = () =>{
    const [register,registerhandler] = useState({  });
    const History = useHistory();

    const changeHandler = (e) =>{
        registerhandler({ ...register,[e.target.name]:e.target.value});
        console.log(register);
    };

    const registration = async() =>{
        var reg_data = new FormData();
        reg_data.append('name',register.name);
        reg_data.append('email',register.email);
        reg_data.append('password',register.password);
        if(register.name === ''  || register.email === '' || register.password === ''){
          alert("Enter all the details");
        }
        else if(register.name === undefined  || register.email === undefined || register.password === undefined){
          alert("Enter all the details");
        }
        else{
            const response = await axios({
                url: "http://localhost:81/BTK/Booktheknowledge-backend/PHP/Register.php",
                method: "post",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                data: reg_data,
            });
            console.log(response.data.status);
            if(response.data.status === "true"){
                alert(response.data.message);
                window.location.reload(false);
            }
            else{
                alert(response.data.message);
                window.location.reload(false);
            }
        }
    }
    
    const login = () =>{
        History.push("/")
    }
    return(
        <div>
             <div>
                <br/>
                <img src="/logo.png"/>
                <br/>
                <br/>
            </div>
            <div className="register">
                <form autoComplete="off">
                    <h3>Create Account</h3>

                    <h4>Name</h4><br/>
                    <input type="text" name="name" className="input" onChange={changeHandler}/><br/>

                    <h4>E-mail</h4><br/>
                    <input type="text" name="email" className="input" onChange={changeHandler}/><br/>

                    <h4>Password</h4><br/>
                    <input type="password" name="password" className="input" onChange={changeHandler}/><br/><br/>

                    <input type="button" value="Register" className="button" onClick={registration}/>

                    <div style={{paddingTop:"20px"}}>
                        <p style={{fontSize:"15px"}}>Already have an account?&nbsp;
                            <label className="loginlabel" onClick={login}><b>Login</b></label>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register;