import React, { Component } from 'react'
import cart from "../images/Common.png"
import CartBox from "./CartBox.js"

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      product:this.props.productData,
      productCurrency:0,
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.priceChangerArg!==this.props.priceChangerArg){
      this.setState({productCurrency:this.props.priceChangerArg})
    }
  }


  render(){ 
      return(
       <div>
          <div className='categoryName'>
              <p>All</p>
          </div>
          <div className="productConteiner">
              {
                this.state.product.map((products,index)=>(
                    products.inStock==true?
                        <div  className="allProducts" key={products.id}>
                            <div  key={products.id} className={products.name}>                           
                                <img onClick={()=>this.props.pdpProductChange(index)} className ="productImg" src={products.gallery[0]}/>
                                <img onClick={()=>this.props.cartBoxdDataChange(index)}  src={cart} className="cart"/>
                                <div className = "productContent">
                                    <div className ="productTitle">{products.name}</div> 
                                    <div className = "productPrice">{this.props.changingCurrency}{this.state.product[index].prices[this.props.priceChangerArg].amount}</div>
                                </div>
                            </div>
                        </div>:     
                    products.inStock==false?
                        <div className="allProducts" key={products.id}>      
                            <div key={products.id} className={products.name}>
                                <img className ="productImg outOfStockImg" src={products.gallery[0]}/>
                                <div className = "productContent">
                                    <div className ="productTitle">{products.name}</div>
                                    <div className = "productPrice">{this.props.changingCurrency}{this.state.product[index].prices[this.props.priceChangerArg].amount}</div>
                                    <span className = "outOfSTock">out Of Stock</span>
                                </div>
                            </div>
                        </div>
                    :false
                  )
                )
              }
            </div>
        </div>
      )

  }
}

