import React, { Component } from 'react'
  import pic from "../images/logo.png"
  import pic2 from "../images/arrow.png";
  import {Link } from "react-router-dom";


export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.state={
      productIndex:this.props.prIndex,
      productCurrency:0,
      productData:this.props.productData
     
    }
  }
  render() {
    return (
      <div className = "NavigationBar">
      <ul>
          <li onClick={()=>this.props.mainPageChanger(0)} className ="All"><Link className="allLink" to="/">All</Link></li>
          <li onClick={()=>this.props.mainPageChanger(1)} className='tech'><Link className="techLink" to="/DisplayTechProduct">TECH</Link></li>
          <li onClick={()=>this.props.mainPageChanger(2)} className='cloths'><Link className="clothsLink" to="/DisplayClothesProduct">CLOTHS</Link></li>
      </ul>
      <div className='greenlogoConteiner'> 
          <img src={pic} className="logo"/>
          <img src={pic2} className="logoArrow"/>
      </div>
    </div>
    )
  }
}

