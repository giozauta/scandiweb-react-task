import React, { Component } from 'react'

export default class LittleCartContainer extends Component {
    constructor(props){
        super(props)
        this.state={
          productIndex:this.props.prIndex,
          productCurrency:0,
          productData:this.props.productData,
          className:this.props.className,
          mainPage:this.props.mainPage,
          setShowTooltip:this.props.setShowTooltip,
          className:"cartContainer"
        }
      }


      componentDidMount() {
        this.updateData();
      }
      
      componentDidUpdate(prevProps) {
        if (prevProps.productData !== this.props.productData) {
          this.updateData();
        }
      }
      
      updateData = () => {
        this.setState({
          productData: this.props.productData
        });
        
      };
    

  render() {
    return(
      <div className="littleCartContainer">
        {this.state.productData.map((data,index)=>
            <div className="attrContainer" key={data.id}>
              <div className='rectangle'></div>
              <section className="section1">
                <p className="brandName">brandis saxeli </p>
                <p className="productName">{data.name}</p> 
                <p className="price">{this.props.changingCurrency}{data.prices[this.props.priceChangerArg].amount}</p>      
                <div className="attrBox">
                  {data.attributes.map((attr,index)=>
                    <div key={index}>
                        <p className="attrValueName">{attr.name}</p>
                         {attr.items.map((arg,index)=>
                            <p  style={{ background:arg.value,color:arg.value,overflow:'hidden'}}
                                key={index} className='itemsValue'>{arg.displayValue}
                            </p>)}
                    </div>)}
                </div>
              </section>
              <section className="section2">
                  <div className="quantityBox">
                  <div className="plus" onClick={()=>this.props.plus(index)}>+</div>
                  <div className="quantityLabel">{data.quantity}</div>
                  <div className="minus" onClick={()=>this.props.minus(index)}>-</div>
                  </div>
              </section>
              <section className='section3'>
                  <div className="picture"><img className='cartBoxPrImage' src={data.gallery[0]} /></div>
              </section>
            </div>)}
        <div className='totalPrice'>
              Total : {this.props.changingCurrency}
              {this.state.productData.map(data=>data.prices[this.props.priceChangerArg].amount*data.quantity).reduce((acc, val) => acc + val, 0).toFixed(2)}
        </div>
        <div className="littleCartButtons">
            <button className="viewBagButton">VIEW BAG</button>
            <button className='checkOutButton'>CHECK OUT</button>
        </div>
      </div>
    )
  }
}


/*

    
      plus = (index) => {
        this.setState((prevState) => {
          const updatedProductData = [...prevState.productData];
          updatedProductData[index] = {
            ...updatedProductData[index],
            quantity: updatedProductData[index].quantity + 1
          };
      
          return {
            productData: updatedProductData
          };
        });
      }
      
      minus = (index) => {
        const { productData } = this.state;
        if (productData[index].quantity === 0) {
          productData.splice(index, 1);
          this.setState({
            productData: [...productData]
          });
        } else if (productData[index].quantity > 0) {
          this.setState((prevState) => {
            const updatedProductData = [...prevState.productData];
            updatedProductData[index] = {
              ...updatedProductData[index],
              quantity: updatedProductData[index].quantity - 1
            };
      
            return {
              productData: updatedProductData
            };
          });
        }
      };


*/
