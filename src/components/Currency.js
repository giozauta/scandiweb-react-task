import React, { Component } from 'react'



export default class Currency extends Component {
  constructor(props){
    super(props);
    this.state={
      currency:this.props.currency
    }
  }

  render() {
    return (
        <div className="currency--box">
          <span className="dropdownBtn">{this.props.displayCurrency}</span>
            <div className="dropdown-content">
              {this.state.currency.map(
                (result)=><div onClick={()=>this.props.amountChanger(result.symbol)} className="currencyItm" key={result.symbol}>{result.symbol} {result.label}</div>
              )}
            </div>    
        </div>
    )
  }
}

