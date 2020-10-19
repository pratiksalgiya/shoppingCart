import React from 'react';
import './App.css';

class ItemAddedPopUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message:'Item added Successfully'
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ message: '' }), 1000);
    }

    componentDidUpdate() {
        this.props.setItemAddedSuccessfully();
    }

    render() {
        return (
            <div>{this.state.message}</div>     
        );
    }
}


export default ItemAddedPopUp;
  