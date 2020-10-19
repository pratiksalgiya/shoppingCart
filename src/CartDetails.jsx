import React from 'react';
import './App.css';

class CartDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        let totalItems = 0;
        let totalSum = 0;
        let totalDiscount = 0;
        let OrderTotal = 0;
            Object.keys(this.props.cartData).map((ele) => {
                totalItems = totalItems + this.props.cartData[ele].quantity
                totalSum = totalSum + this.props.cartData[ele].quantity * this.props.cartData[ele].price.display
                totalDiscount = totalDiscount + ((this.props.cartData[ele].quantity * this.props.cartData[ele].price.display) - (this.props.cartData[ele].quantity * this.props.cartData[ele].price.actual))
                //check the total
                OrderTotal = this.props.cartData[ele].quantity * this.props.cartData[ele].price.actual
                return { totalItems, totalSum, totalDiscount, OrderTotal };
            })
        return (
            <div className="flex-display">
                <table className="padding-top">
                    <tr><th className="common-padding">Item</th><th className="common-padding">Quantity</th><th className="common-padding">Price</th></tr>
                    {Object.keys(this.props.cartData).map((ele) => {
                        console.log(ele)
                        return <tr><td>{ele}</td>
                            <td>{this.props.cartData[ele].quantity}</td>
                            <td>{this.props.cartData[ele].price.actual}</td>
                        </tr>
                    })}
                </table>
                <div className="cart-total-card">
                    Total
                <div>
                        <span>Items({totalItems})</span>
                        <span>:</span>
                        <span>{totalSum}</span>
                    </div>
                    <div>
                        <span>Discount</span>
                        <span>:</span>
                        <span>-{totalDiscount}</span>
                    </div>
                    <div>
                        <span>Order Total</span>
                        <span>:</span>
                        <span>{OrderTotal}</span>
                    </div>
                    
                </div>
            </div>
        );
    }
}


export default CartDetails;
