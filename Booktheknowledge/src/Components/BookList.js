import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './BookList.css'
import Header from './Header'
import {useHistory} from 'react-router-dom'

const BookList = () =>{
    const [list,setList] = useState([]);
    const History = useHistory();

    useEffect( () => {
         axios.get("http://localhost:81/BTK/Booktheknowledge-backend/PHP/BookList.php")
        .then(response => {
            setList(response.data.result)
        })
    },[]);

    const addtocart = async(id) =>{
        var data = new FormData();
        data.append('email',localStorage.getItem('email'));
        data.append('id',id);
        const response = await axios({
                url: "http://localhost:81/BTK/Booktheknowledge-backend/PHP/AddtoCart.php",
                method: "post",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                data: data,
        });
        if(response.data.status === "true"){
            alert(response.data.message);
        }
        else{
            alert(response.data.message);
        }
    }
    const login = () =>{
        History.push('/NotLoggedIn')
    }

    const viewcart = () =>{
        History.push('/ViewCart')
    }
    if(localStorage.getItem('email') !== null){
        return(
        <div>
            <Header/>
            <div>
                <input type="button" value="View Cart" className="viewcart" onClick={viewcart}/>
            </div>
        <div className="booklist">
            {list.map((booklist) =>{
                const {id,img,title,author,price}=booklist;
                return(
                    <div className="book" key={id}>
                        <img src={img} className="bookimg"/>
                        <pre>{title}</pre>
                        <p>{author}</p>
                        <h6>₹{price}</h6>
                        <input type="button" id={id} value="Add to Cart" className="addtocart"
                          onClick={(e) => addtocart(e.target.id)}/>
                    </div>
                )
            })}
        </div>
        </div>
    )
    }
    else{
        return(
            <div>
                {login()}
            </div>
        )
    }
    
}

export default BookList;