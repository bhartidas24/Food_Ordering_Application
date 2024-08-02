import axios from 'axios';
import { default as React, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import Navbars from '../components/Navbars';

export default function Payment({}) {
  const [credentials, setCredentials] = useState({ name: "", number: "", amount: "" });
  
  const navigate = useNavigate();

  const location = useLocation();
  const TotalPrice = location.state?.price;

  let data = useCart();
  let dispatch = useDispatchCart();

 

  const handelPayNow=async(e) =>{
    e.preventDefault();
    axios.post('/payment',{
      data:{
        ...credentials,
        amount:TotalPrice
      }
    })
    .then(response=>{
      window.location.href = response.data
    })
    .catch(error=>{
      console.log(error);
    })

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  
  return (
   
    <div>
    <Navbars/>
      
      <div className='container' style={{display:'flex' , justifyContent:'space-between', marginTop:20}}>
      <div className="card" style={{width:'35rem'}}>
      <table className='table '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 style={{margin:'auto'}}>Total Price : {TotalPrice}</h2>
      </div>
      
     

      <form method='post'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    
                    
                    <div className="mb-3">
                        <label htmlFor="number" className="form-label">Mobile Number</label>
                        <input type="number" className="form-control" name='number' value={credentials.number} onChange={onChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="number" className="form-control" name='amount' value={TotalPrice} onChange={onChange} />
                    </div>
                   
                    <button type="button" className="btn btn-primary" onClick={handelPayNow}>Pay Now</button>
                </form>
         
          
       
       
      
      </div>




    </div>
  )
}


