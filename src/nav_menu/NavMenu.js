import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";
import ProductCatalog from '../product_catalog/ProductCatalog';
import ProductForm from '../product_form/ProductForm';
import ShoppingCart from './shopping_cart_compo/ShoppingCart';
import './NavMenu.css';

const NavMenu = () => {

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary text-white fixed-top" id="navBar">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <li className="nav-link">
                                <Link className="nav-item nav-link" to="/home">Inicio</Link>
                            </li>
                            <li className="nav-link nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Productos
                                </a>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/products">Ver catálogo</Link>
                                    <Link className="dropdown-item" to="/product/create">Crear nuevo producto</Link>
                                </div>
                            </li>
                            <li className="nav-link nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Servicios
                                </a>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/products">Ver catálogo</Link>
                                    <Link className="dropdown-item" to="/product/create">Crear nuevo servicio</Link>
                                </div>
                            </li>
                            <li className="nav-link">
                                <Link className="nav-item nav-link" to="/help">Ayuda</Link>
                            </li>
                            <ShoppingCart />
                            <div className="profile-header-container">
                                <div className="profile-header-img">
                                    <img className="img-circle" src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png" alt="user ph" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Switch>
                <Route path="/products">
                    <ProductCatalog />
                </Route>
                <Route path="/product/:operation/:id?">
                    <ProductForm />
                </Route>
            </Switch>
        </Router>
    );

}

export default NavMenu;