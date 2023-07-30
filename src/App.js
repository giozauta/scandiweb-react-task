import './App.css';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, gql } from '@apollo/client';
import NavigationBar from './components/NavigationBar.js';
import Home from './components/Home.js';
import DisplayTechProduct from './components/DisplayTechProduct.js';
import DisplayClothesProduct from './components/DisplayClothesProduct.js';
import Currency from './components/Currency.js';
import Basket from './components/Basket.js';
import Pdp from './components/Pdp.js';
import CartBox from './components/CartBox.js';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      currency: [],
      changingCurrency: '$',
      priceChangerArg: 0,
      pdpIndex: 0,
      mainPage: 0,
      cartBoxPrData:[],
      cartBoxQuantityIndex: "",
      //for making card little window
      setShowTooltip:"",
    };
  }

  amountChanger = (arg) => {
    switch (arg) {
      case '$':
        return this.setState((prevState) => ({ priceChangerArg: 0, changingCurrency: '$' }));
      case '£':
        return this.setState((prevState) => ({ priceChangerArg: 1, changingCurrency: '£' }));
      case 'A$':
        return this.setState((prevState) => ({ priceChangerArg: 2, changingCurrency: 'A$' }));
      case '¥':
        return this.setState((prevState) => ({ priceChangerArg: 3, changingCurrency: '¥' }));
      case '₽':
        return this.setState((prevState) => ({ priceChangerArg: 4, changingCurrency: '₽' }));
      default:
        return null;
    }
  };


  componentDidMount(){
    // Instantiate required constructor fields
    const cache = new InMemoryCache();
    const link = new HttpLink({
      uri: 'http://localhost:4000/',
    });
    const client = new ApolloClient({
      // Provide required constructor fields
      cache: cache,
      link: link,
      // Provide some optional constructor fields
      name: 'react-web-client',
      version: '1.3',
      queryDeduplication: false,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
      },
    });
  client
    .query({
      query: gql`
          query{
            category{
              products{
                      id
                      attributes{
                        name
                        type
                        items{
                          displayValue
                          value
                        }
                      }
                      inStock
                      category
                      name
                      gallery
                      prices{
                        currency{
                          label
                          symbol
                        }
                        amount
                      }
                }
            }
          }
      `,
    })
    .then((result) => {
      const products = result.data.category.products.map((product) => ({
        ...product,
        quantity: 1,
      }));
      const currency = result.data.category.products[0].prices.map(
        (price) => price.currency
      );
  
      this.setState({
        productData: products,
        currency: currency,
      });
    });
  
  }

mainPageChanger=(arg)=>{
  this.setState({
    mainPage:arg
  })
}

pdpProductChange= (arg)=>{
  this.setState({
    pdpIndex:arg,
    mainPage:3
  })
}

cartBoxdDataChange = (index) =>{
  this.setState(prevState => {
    const productData = this.state.productData[index];
    const isProductInCart = prevState.cartBoxPrData.some(product => product.id === productData.id);

    if (!isProductInCart) {
      const newCartBoxPrData = [...prevState.cartBoxPrData, { ...productData, quantity: 1 }];
      return {
        cartBoxPrData: newCartBoxPrData
      };
    } else {
      const updatedCartBoxPrData = prevState.cartBoxPrData.map((product, i) => {
        if (product.id === productData.id) {
          return {
            ...product,
            quantity: prevState.cartBoxPrData[i].quantity + 1
          }
        }
        return product;
      });

      return {
        cartBoxPrData: updatedCartBoxPrData
      };
    }
  });
};



changeCart = ()=>{
  this.setState({
    mainPage:4 
  })
}


plus = (index) => {
  this.setState((prevState) => {
    const updatedProductData = [...prevState.cartBoxPrData];
    updatedProductData[index] = {
      ...updatedProductData[index],
      quantity: updatedProductData[index].quantity + 1
    };

    return {
      cartBoxPrData: updatedProductData
    };
  });
}
minus = (index) => {
  const { cartBoxPrData } = this.state;
  if (cartBoxPrData[index].quantity === 0) {
    cartBoxPrData.splice(index, 1);
    this.setState({
      cartBoxPrData: [...cartBoxPrData]
    });
  } else if (cartBoxPrData[index].quantity > 0) {
    this.setState((prevState) => {
      const updatedProductData = [...prevState.cartBoxPrData];
      updatedProductData[index] = {
        ...updatedProductData[index],
        quantity: updatedProductData[index].quantity - 1
      };

      return {
        cartBoxPrData: updatedProductData
      };
    });
  }
}

  render(){
    if(this.state.productData.length>0){//I need ("if") because sometimes the page doesn't load without if 
        return(
          <div className="App">
              <header>
                <NavigationBar  mainPageChanger={this.mainPageChanger}/>
                <div className="header--child2">
                  {this.state.currency.length>0&&<Currency amountChanger={this.amountChanger.bind(this)} displayCurrency={this.state.changingCurrency} currency={this.state.currency}/>}
                  <Basket
                    changeCart={this.changeCart}
                    //
                    setShowTooltip={this.state.setShowTooltip}
                    changingCurrency={this.state.changingCurrency}
                    mainPage={this.state.mainPage} 
                    cartBoxPrData={this.state.cartBoxPrData} 
                    prIndex = {this.state.pdpIndex} 
                    priceChangerArg={this.state.priceChangerArg} 
                    currency = {this.state.currency}
                    minus={this.minus}
                    plus={this.plus}
                    />
                </div>
              </header>
              {this.state.mainPage==0&&<Home cartBoxdDataChange={this.cartBoxdDataChange} pdpProductChange={this.pdpProductChange} changingCurrency={this.state.changingCurrency} priceChangerArg={this.state.priceChangerArg} currency = {this.state.currency} productData={this.state.productData}/>}
              {this.state.mainPage==1&&<DisplayTechProduct cartBoxdDataChange={this.cartBoxdDataChange} pdpProductChange={this.pdpProductChange} changingCurrency={this.state.changingCurrency} priceChangerArg={this.state.priceChangerArg}  productData={this.state.productData}/>}   
              {this.state.mainPage==2&&<DisplayClothesProduct cartBoxdDataChange={this.cartBoxdDataChange} pdpProductChange={this.pdpProductChange} changingCurrency={this.state.changingCurrency} priceChangerArg={this.state.priceChangerArg}  productData={this.state.productData}/>}    
              {this.state.mainPage==3&&<Pdp prIndex={this.state.pdpIndex} productData={this.state.productData} changingCurrency={this.state.changingCurrency}  priceChangerArg={this.state.priceChangerArg}/>}
              {this.state.mainPage==4&&<CartBox minus={this.minus} plus={this.plus} changingCurrency={this.state.changingCurrency} mainPage={this.state.mainPage} productData={this.state.cartBoxPrData} prIndex = {this.state.pdpIndex} priceChangerArg={this.state.priceChangerArg} currency = {this.state.currency}/>}
            </div>  
        )
    }
    else{
      return(
      <div className="App">
        <h1>Loading...</h1>
      </div>)
    }
  }

}

export default App;
