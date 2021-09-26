import React from 'react';
import {
    Link
} from "react-router-dom";
import ShoppingCart from './shopping_cart_compo/ShoppingCart';
import UserProfileIcon from '../userComponents/user_profile_icon/UserProfileIcon';

class NavMenu extends React.Component {

    renderShoppingCart() {
        if (this.props.userType === 'customer') return <ShoppingCart />;
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg  top-bar-bg bg-gradient fw-bold fixed-top" id="navBar">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <li className="nav-link">
                                <Link className="nav-link nav-item text-white" to="/home">Inicio</Link>
                            </li>
                            <li className="nav-link nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href=" " role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Productos
                                </a>
                                <ul className="dropdown-menu">
                                    <Link className="dropdown-item" to="/products">Ver catálogo</Link>
                                    <Link hidden={this.props.userType === 'customer'} className="dropdown-item" to="/product/create">Crear nuevo producto</Link>
                                </ul>
                            </li>
                            <li className="nav-link nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href=" " role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Servicios
                                </a>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/services">Ver catálogo</Link>
                                    <Link hidden={this.props.userType === 'customer'} className="dropdown-item" to="/service/create">Crear nuevo servicio</Link>
                                </div>
                            </li>
                            <li className="nav-link">
                                <Link className="nav-item nav-link text-white" to="/help">Ayuda</Link>
                            </li>
                            {this.renderShoppingCart()}
                            <UserProfileIcon ordersOption = {(this.props.userType === 'customer') ? 'Mis pedidos' : 'Ver pedidos'}/>
                        </div>
                    </div>
                </div>
            </nav >
        );
    }

}

export default NavMenu;