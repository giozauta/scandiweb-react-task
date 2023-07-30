import React, { Component } from 'react';
import cart from "../images/Common.png"

export default class DisplayClothesProduct extends Component {
    constructor(props){
        super(props)
        this.state={
          data:this.props.productData,
          productCurrency:0
        }
      }
    componentDidUpdate(prevProps){
            if(prevProps.priceChangerArg!==this.props.priceChangerArg){
            this.setState({productCurrency:this.props.priceChangerArg})
            }
    }

  render() {
    return (
      <div>
          <div className='categoryName'>
              <p>Clothes</p>
          </div>
          <div className="productConteiner">
              {
                  this.state.data.map((products,index)=>(
              /*for returning only clothes*/
                  products.category==="clothes"&&products.inStock==true?
                      <div  className="allProducts" key={products.id}>      
                          <div key={products.id} className={products.name}>
                              <img onClick={()=>this.props.pdpProductChange(index)} className ="productImg" src={products.gallery[0]}/>
                              <img onClick={()=>this.props.cartBoxdDataChange(index)}  src={cart} className="cart"/>
                              <div className = "productContent">
                                  <div className ="productTitle">{products.name}</div>
                                  <div className = "productPrice">{this.props.changingCurrency}{products.prices[this.props.priceChangerArg].amount}</div>
                              </div>
                          </div>
                      </div>:
                      
              /*for returning out of stock */
                  products.category==="clothes"&&products.inStock==false?
                      <div className="allProducts" key={products.id}>      
                          <div key={products.id} className={products.name}>
                              <img className ="productImg outOfStockImg" src={products.gallery[0]}/>
                              <div className = "productContent">
                                  <div className ="productTitle">{products.name}</div>
                                  <div className = "productPrice">{this.props.changingCurrency}{products.prices[this.props.priceChangerArg].amount}</div>
                                  <span className = "outOfSTock">out Of Stock</span>
                              </div>
                          </div>
                      </div>
              :false
              )
          )}
          </div>
      </div>   
    )
  }
}


