import React, { useState ,useEffect} from 'react'
import './ViewCart.css'
import axios from 'axios'
import { getDefaultNormalizer } from '@testing-library/dom'
import { useHistory } from 'react-router'

const ViewCart = () =>{
    const[userlist,setUserlist] = useState([]);
    const [cost,setCost] = useState(0);
    const History = useHistory();

    useEffect( () => {
        axios.post("http://localhost:81/Booktheknowledge-backend/PHP/UserCart.php",{'email':localStorage.getItem('email')})
        .then(response => {
            setUserlist(response.data.result)
            calculateCost();
        })
    }, [])

    const calculateCost = () =>{
        axios.post("http://localhost:81/Booktheknowledge-backend/PHP/TotalCart.php",{'email':localStorage.getItem('email')})
        .then(response =>{
            console.log(response.data.result)
            setCost(response.data.result)
        })

    }

    const deleteitem = async(cid) =>{
        await axios.post("http://localhost:81/Booktheknowledge-backend/PHP/DeleteItem.php",{'cid':cid})
        .then(response =>{
            if(response.data.status === "true"){
                window.location.reload(false);
            }
            else{
                window.location.reaload(false);
            }
        })
    }

    const logout = () =>{
        localStorage.clear();
        History.push('/')
    }

    const backtoshop = () =>{
        History.push('/BookList')
    }

    const notlogin = () =>{
        History.push('/NotLoggedIn')
    }

    if(localStorage.getItem('email')!=null){
        return(
        <div>
            <div>
                <input type="button" value="Logout" className="logoutbutton" onClick={logout}/>
            </div>
            <table>
                <tr>
                    <th style={{width:"200px"}}>Item</th>
                    <th style={{width:"600px"}}>Details</th>
                    <th style={{width:"300px"}}>Price</th>
                    <th style={{width:"100px"}}></th>
                </tr>
            </table>
            <hr/>
            {console.log(userlist)}
            {userlist.map((list) => {
                        const {cid,img,title,author,price} = list;
                        return(
                            <div>
                                <table>
                                <tr>
                                    <td>
                                        <img src={img} className="cartimg"/>
                                    </td>
                                    <td style={{width:"700px"}}>
                                        {title}<br/>
                                        {author}
                                    </td>
                                    <td style={{width:"200px"}}>
                                        {price}
                                    </td>
                                    <td style={{width:"150px"}}>
                                        <input type="button"
                                                id = {cid}
                                            value="Delete"
                                            className="deletebutton"
                                            onClick={(e) =>deleteitem(e.target.id)}
                                        />
                                    </td>
                                </tr>
                                </table>
                            </div>
                        )
            })}  
            <div className="totaldiv">
                <h3 className="totalcost">Total Cost&nbsp;&nbsp;:&nbsp;{cost}</h3>
                <input type="button" value="Back to Shopping" className="backtoshop" onClick={backtoshop}/>
            </div>
        </div>
    )
    }
    else{
        return(
            <div>
                {notlogin()}
            </div>
        )
    }
}

export default ViewCart;