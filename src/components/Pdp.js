import React, { Component } from 'react'
import  "./Pdp.css"


export default class Pdp extends Component {
  constructor(props){
    super(props)
    this.state={
      productIndex:this.props.prIndex,
      littleImages:this.props.productData.map(data=>data.gallery),
      bigPicIndex:0,
      productName:this.props.productData.map(data=>data.name),
      productBrandName:this.props.productData.map(data=>data.id),
      productType:this.props.productData.map(data=>data.attributes.map(attribute=>attribute.type)),
      productTypeName:this.props.productData.map(data=>data.attributes.map(attribute=>attribute.name)),
      productsItemsValue:this.props.productData.map(data=>data.attributes.map(attr=>attr.items.map(item=>item.value))),
      productUsbThree:"",
      productIdKeyBoard:"",
      //for changing currency
      product:this.props.productData,
      productCurrency:0
    }
    this.changeBigPicture = this.changeBigPicture.bind(this)
  }

  changeBigPicture(arg){
    this.setState({bigPicIndex:arg})
  }
  componentDidUpdate(prevProps){
    if(prevProps.priceChangerArg!==this.props.priceChangerArg){
      this.setState({productCurrency:this.props.priceChangerArg})
    }
  }
  render() { 
    //this is for makeing brandName
    const regxp = /([A-Za-z])+/;
    const regxp2 =/([A-Za-z])*-(\w*)/g;
    const text = this.state.productBrandName[this.state.productIndex];
    const textFirstWord = text.match(regxp);
    const result = text.replace(regxp2,textFirstWord);
    const brandName = result.match(regxp)[0].toUpperCase();
    //this is for product attribute name and value 
    const prTypeName=this.state.productTypeName[this.state.productIndex];
          prTypeName.reverse();
    const productValue = this.state.productsItemsValue[this.state.productIndex]
          productValue.reverse();

    return (
      <div className = "pdp-container">
        <div className="pdp-little-pic">
            <ul className='littlePicsUl'>
              {/*this is for changing main picture */}
              {this.state.littleImages[this.state.productIndex].map((arg,index)=><li key={index} onClick={()=>this.changeBigPicture(index)}><img className="littlePics" src={arg}/></li>)}
            </ul>
        </div>
        <div className="pdp-big-pic">
            <img className="big-pic" src={this.state.littleImages[this.state.productIndex][this.state.bigPicIndex]}/>
        </div>
        <div className="pdp-navigationBar">
            <p className="pdp-brandName">{brandName}</p>
            <p className="pdp-productName">{this.state.productName[this.state.productIndex]}</p>

            <div className="pdpAttrBox">
              {prTypeName.map((name,index)=>
                <div key={name}>
                  <p className="pdp-value-name">{name.toUpperCase()}</p>
                  {productValue[index].map(value=>  
                         // i use inline style here for background and for not to show text value if it is color                
                        <div style={{ background:value,color:value,overflow:'hidden'}} className='pdpAttrValueBox' key={value}>
                          <p>{value +" "}</p>
                        </div>
                    )}
                </div>
              )}
            </div>

            <p className="pdp-productPrice-head">PRICE</p>
                  {
                    <div className = "productPrice">{this.props.changingCurrency}{this.state.product[this.state.productIndex].prices[this.props.priceChangerArg].amount}</div>
                  }
            {<br/>}    
            <button className="addToCartButton">ADD TO CART </button>
        </div>

      </div>
    )
  }
}
