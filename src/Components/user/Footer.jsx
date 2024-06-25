// eslint-disable-next-line no-unused-vars
import React from "react";
import app from "../../assets/f1.webp";
import app1 from "../../assets/f2.webp";
import './Footer.css'

const Footer = () => {
  return (
   <div className="footer">
     {/* <div className="container ">  */}
      <div className="row d-flex flex-wrap justify-content-center">
        <div className="col-sm-12 col-md-5 col-lg-3">
          <h2>LANGUAGE MOVIES</h2>
          <div className="line m-3"></div>
          <ul className="d-flex flex-column gap-2">
            <li>English movie</li>
            <li>Tamil movie</li>
            <li>Punjabi Movie</li>
            <li>Hindi movie</li>
            <li>Malyalam movie</li>
            <li>English Action movie</li>
            <li> Hindi Action movie</li>
          </ul>
        </div>
        <div className="col-sm-12 col-md-5 col-lg-3">
        <h2>MOVIES BY PRESENTER </h2>
        <div className="line m-3"></div>
          <ul className="d-flex flex-column gap-2">
            <li>Action movie</li>
            <li>Romantic movie</li>
            <li>Adult movie</li>
            <li>Comedy movie</li>
            <li>Drama movie</li>
            <li>Musical movie</li>
            <li>Classical movie</li>
          </ul>  
                
        </div>
        <div className="col-sm-12 col-md-5 col-lg-3">
        <h2>BOOKING ONLINE</h2>
        <div className="line m-3"></div>
          <ul className="d-flex flex-column gap-2">
            <li>www.example.com</li>
            <li>www.hello.com</li>
            <li>www.example.com</li>
            <li>www.hello.com</li>
            <li>www.example.com</li>
            <li>www.hello.com</li>
            <li>www.example.com</li>
          </ul>  
        </div>
        <div className="col-sm-12 col-md-5 col-lg-3">
        <h2>APP AVAILABLE ON</h2>
        <div className="line m-3"></div>
          <ul className="d-flex flex-column gap-2 list-unstyled">
            <li>Download App and Get Free Movie Ticket !</li>
            <li><img src={app} alt="" className="rounded"/></li>
            <li><img src={app1} alt="" className="rounded"/></li>
            <li>$50 Payback on App Download</li>
          </ul>  
        </div>
      </div>
   </div>

  //  </div>
    
  );
};

export default Footer;
