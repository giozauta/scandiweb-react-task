import React, { Component } from 'react'
import basket2 from "../images/basket2.png"
import LittleCartContainer from './LittleCartContainer'
import "./basket.css"



export default class Basket extends Component {
  constructor(props){
    super(props)
    this.state={
                    setShowTooltip:this.props.setShowTooltip,
                    changingCurrency:this.props.changingCurrency,
                    mainPage:this.props.mainPage,
                    cartBoxPrData:this.props.cartBoxPrData,
                    prIndex:this.props.pdpIndex,
                    priceChangerArg:this.props.priceChangerArg,
                    currency:this.props.currency

    }
  }

  componentDidMount() {
    this.updateData();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.cartBoxPrData !== this.props.cartBoxPrData) {
      this.updateData();
    }
  }
  
  updateData = () => {
    this.setState({
      cartBoxPrData: this.props.cartBoxPrData
    });
    
  };
  
  render() {
    return (
      <div className='basketdropdown'>
        <div  className="shoppingCart--box"
                onMouseEnter={this.updateData}
                onClick={this.props.changeCart} >
          <img className="basketImage" src={basket2}/>
        </div>
          <LittleCartContainer
          minus={this.props.minus}
          plus={this.props.plus}
          setShowTooltip={this.state.setShowTooltip} 
          changingCurrency={this.state.changingCurrency}
          mainPage={this.state.mainPage} 
          productData={this.props.cartBoxPrData} 
          prIndex = {this.state.pdpIndex} 
          priceChangerArg={this.state.priceChangerArg} 
          currency = {this.state.currency}
        />
      </div>
  )
 }
}