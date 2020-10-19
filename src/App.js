import React from 'react';
import { response } from './Data'
import CartDetails from './CartDetails'
import ItemAddedPopUp from './ItemAddedPopUp'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      responseData: [],
      itemQuantity: 1,
      cart: {},
      itemAddedSuccessfully:false
    }
  }

  componentDidMount() {
    this.setState({
      responseData: response.items
    })
  }

  handleCart = (event, index) => {
    this.setState(prevState => {
      let { cart, responseData } = prevState;
      responseData[index].showAddRemoveButtons = true;
      responseData[index].addToCart = true
      if (cart[responseData[index].name]) {
        cart[responseData[index].name].quantity = cart[responseData[index].name].quantity + 1;
        responseData[index].quantity = responseData[index].quantity + 1
      } else {
        cart[responseData[index].name] = { ...responseData[index], quantity: 1 };
        responseData[index] = { ...responseData[index], quantity: 1 }
      }
     
      return { responseData, cart, showAddtoCart: false, itemAddedSuccessfully:true}
    })
  }

  //Adding more quantity on +
  handleAddQuantity = (event, index) => {
    this.setState(prevState => {
      let { cart, responseData } = prevState;
      if (responseData[index].quantity) {
        responseData[index].quantity = responseData[index].quantity + 1
        cart[responseData[index].name].quantity = cart[responseData[index].name].quantity + 1;
      }
      else {
        responseData[index] = { ...responseData[index], quantity: 1 }
      }
      return { responseData, cart }
    });
  }


  //callback to set the flag for pop up message
  setItemAddedSuccessfully = () => {
    this.setState({itemAddedSuccessfully:false})
  }

  handleDecreaseQuantity = (event, index) => {
    this.setState(prevState => {
      let { cart, responseData } = prevState;
      if (responseData[index].quantity) {
        responseData[index].quantity = responseData[index].quantity - 1
        cart[responseData[index].name].quantity = cart[responseData[index].name].quantity - 1;
        if (responseData[index].quantity === 0) {
          responseData[index].addToCart = false
          responseData[index].showAddRemoveButtons = false;
          delete cart[responseData[index].name];
        }
      }
      return { responseData, cart }
    });
  }

  render() {
    return (
      <div>
        <div className="border"></div>
        <div>All Items</div>
        {this.state.itemAddedSuccessfully && <ItemAddedPopUp
          setItemAddedSuccessfully={this.setItemAddedSuccessfully}
        />}
        <div className="border"></div>
        <div className="flex-display">
          {this.state.responseData && this.state.responseData.map((ele, index) => {
            return (<div>
              <img src={ele.image} />
              <div>{ele.name}</div>
              <div className="strike">{ele.price.display}</div>
              <span>{ele.price.actual}</span>
              {!ele.addToCart && <button onClick={(event) => this.handleCart(event, index)}>Add to Cart</button>}
              {ele.showAddRemoveButtons &&
                <div>
                <button onClick={(event) => this.handleDecreaseQuantity(event, index)}>-</button>
                <input value={ele.quantity || 0}/>
                <button onClick={(event) => this.handleAddQuantity(event, index)}>+</button>
                </div>}
            </div>)
          })}
        </div>
        <CartDetails cartData={this.state.cart}/>
      </div>
    );
  }
}


export default App;
