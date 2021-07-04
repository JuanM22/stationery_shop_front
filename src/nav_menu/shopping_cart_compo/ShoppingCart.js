import React from 'react';
import ShoppingCartLogo from './shopping-cart.svg';
import './ShoppingCart.css';

class ShoppingCart extends React.Component {

    componentDidUpdate(prevProps) {
        console.log(this.props.counter);
    }

    render() {
        return (
            <div id="cart">
                <span className="position-absolute p-2 bg-danger border border-light rounded-circle" id="itemAddNotification">
                </span>
                <img className="btn btn-dark dropdown-toggle" src={ShoppingCartLogo} alt="cart logo"
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="cartIcon" />
                <div className="dropdown-menu">
                    <label className="dropdown-item">Productos:
                        <span className="position-absolute badge rounded-pill bg-danger mx-2">
                            {this.props.counter}
                        </span>
                    </label>
                    <label className="dropdown-item">Servicios:
                        <span className="position-absolute badge rounded-pill bg-danger mx-2">
                            2
                        </span>
                    </label>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item">Ver el carrito</button>
                </div>
            </div>
        );
    }
}

export default ShoppingCart;