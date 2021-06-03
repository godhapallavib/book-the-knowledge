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
        axios.post("http://localhost:81/BTK/Booktheknowledge-backend/PHP/UserCart.php",{'email':localStorage.getItem('email')})
        .then(response => {
            setUserlist(response.data.result)
            calculateCost();
        })
    }, [])

    const calculateCost = () =>{
        axios.post("http://localhost:81/BTK/Booktheknowledge-backend/PHP/TotalCart.php",{'email':localStorage.getItem('email')})
        .then(response =>{
            console.log(response.data.result)
            setCost(response.data.result)
        })

    }

    const deleteitem = async(cid) =>{
        await axios.post("http://localhost:81/BTK/Booktheknowledge-backend/PHP/DeleteItem.php",{'cid':cid})
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

    const increment = async(cid) =>{
        await axios.post("http://localhost:81/BTK/Booktheknowledge-backend/PHP/IncrementQuantity.php",{'cid':cid, 'email':localStorage.getItem('email')})
        .then(response =>{
            if(response.data.status === "true"){
                //alert("true")
                window.location.reload(false);
            }
            else{
                //alert("false")
                window.location.reload(false);
            }
        })
    }

    const decrement = async(cid) =>{
        await axios.post("http://localhost:81/BTK/Booktheknowledge-backend/PHP/DecrementQuantity.php",{'cid':cid, 'email':localStorage.getItem('email')})
        .then(response =>{
            if(response.data.status === "true"){
                //alert("true")
                window.location.reload(false);
            }
            else{
                //alert("false")
                window.location.reload(false);
            }
        })
    }

    if(localStorage.getItem('email')!=null){
        return(
        <div>
            <div>
                <input type="button" value="Logout" className="logoutbutton1" onClick={logout}/>
            </div>
            <table>
                <tr>
                    <th style={{width:"200px"}}>Item</th>
                    <th style={{width:"640px"}}>Details</th>
                    <th style={{width:"120px"}}>Quantity</th>
                    <th style={{width:"200px"}}>Price</th>
                    <th style={{width:"150px"}}></th>
                </tr>
            </table>
            <hr/>
            {console.log(userlist)}
            {userlist.map((list) => {
                        const {cid,img,title,author,quantity,price} = list;
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
                                    <td>
                                        <input type="button" value="-" style={{width:"15px"}}
                                            id={cid}
                                            onClick={(e) =>decrement(e.target.id)}
                                            /><br/>
                                        <label>{quantity}</label><br/>
                                        <input type="button" value="+" style={{width:"15px"}}
                                            id={cid}
                                            onClick={(e) =>increment(e.target.id)}
                                            /><br/>
                                    </td>
                                    <td style={{width:"200px"}}>
                                        {quantity*price}
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
                <br/>
                <h3 className="totalcost">Total Cost&nbsp;&nbsp;:&nbsp;{cost}</h3>
            </div>
            <div>
                <input type="button" value="Back to Shopping" className="backtoshop" onClick={backtoshop}/>
                {/* <input type="button" value="Continue to Pay" className="pay"/> */}
                <br/>
                <br/>
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