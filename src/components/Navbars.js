import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from './../screens/Cart';
import { useCart } from './ContextReducer';


export default function Navbars() {

  const [CartView , setCartView] = useState(false);

  let data = useCart();
  const navigate = useNavigate();

const handleLogout = ()=>{
  localStorage.removeItem("authToken");
  localStorage.removeItem("userEmail");
  
  navigate("/login");
}
  return (
    <>
    <div style={{backgroundColor:'gray'}}>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1" to="/">Restaurant</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/"><b>Home</b></Link>
              </li>
              {(localStorage.getItem("authToken"))?
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myorder"><b>My Orders</b></Link>
              </li>
              :""}
            </ul>
            
            {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
            <Link className="btn bg-white  mx-1" style={{borderColor:"black"}} to="/login">Login</Link>
            <Link className="btn bg-white   mx-1" style={{borderColor:"black"}} to="/createuser">Signup</Link>

            </div>
            :
            <div>
            <div className='btn bg-white  mx-2' onClick={()=>{setCartView(true)}}>
            My Cart{" "}
              <Badge pill bg='danger'>{data.length}</Badge>
            </div>
            {CartView ? <Modal onClose={()=>setCartView(false)}><Cart ></Cart></Modal> :" " }
            {/* {cartView ?<Cart></Cart> :" "} */}
            <div className='btn bg-white  mx-2' onClick={handleLogout}> Logout</div>
            </div>
            }
          </div>
        </div>
      </nav>

</div>
    </>
  )
}
