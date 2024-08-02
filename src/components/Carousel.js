import React from 'react'
import './Carousel.css'

export default function Carousel() {
    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" >
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{zIndex:"10"}}>
                        <form className="d-flex" data-bs-theme="dark" role="search">
                            <input className="form-control me-2" id='search' type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img style={{objectFit:'cover !important' ,filter:'brightness(40%' }} src="https://images.unsplash.com/photo-1678292458983-5c04ede5fee3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"  className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img style={{objectFit:'cover !important',filter:'brightness(40%'}} src="https://plus.unsplash.com/premium_photo-1677346803311-b4d68fa9a10f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1677414283794-677bdf6dc6c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ3fHhqUFI0aGxrQkdBfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" style={{filter:"brightness(40%)"}} alt="..." />
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
        </>
    )
}
