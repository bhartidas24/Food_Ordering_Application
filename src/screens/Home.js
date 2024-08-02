import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Navbars from './../components/Navbars';

export default function Home() {

  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);
  // const [search, setSearch] = useState('')
  const loadData = async () =>{
    let response = await fetch("/foodData" , {
      method:"POST",
      headers:{
        'Content-Type' : 'application/json'
      }
    });
    response = await response.json();
    setFoodCat(response[1]);
    setFoodItem(response[0]);
    console.log(response[0] , response[1]);

  }

  useEffect(()=>{
    loadData()
  },[])

  
  return (
    <>
     <div> <Navbars /> </div>
     <div  id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit:'cover !important'}}>
     <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{zIndex:"10"}}>
                        <div className="d-flex" data-bs-theme="dark" role="search">
                            <input className="form-control me-2" id='search' type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://images.unsplash.com/photo-1678292458983-5c04ede5fee3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"  className="d-block w-100" style={{filter:"brightness(40%)" , maxHeight:"500px" ,imageResolution:"inherit"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://plus.unsplash.com/premium_photo-1677346803311-b4d68fa9a10f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" style={{filter:"brightness(40%)", maxHeight:"500px"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1677414283794-677bdf6dc6c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ3fHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" style={{filter:"brightness(40%)", maxHeight:"500px"}} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
    </div>
    <div className='container'>
    
    {
      foodCat !== '[]'
      ? foodCat.map((data)=>{
        return(
          <div className='row mb-3'>
              <div key={data._id} className='fs-3 m-3' style={{color:'black'}} >
                <b>{data.CategoryName}</b>
              </div>
              <hr/>
              {
                foodItem !== '[]'
                ? foodItem.filter((item)=> item.CategoryName === data.CategoryName)
                .map(filterItems=>{
                  return(
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img}
                        descriptions = {filterItems.description}
                      />
                    </div>
                  )
                }):<div>No such Data</div>
              }
          </div>
        )
      })
      :<div>""""""</div>
    }
      {/* <Card /> */}
    </div>
      
    </>
  )
}
