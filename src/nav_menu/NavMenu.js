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
import OrderPreview from '../order_preview/OrderPreview';
import './NavMenu.css';

class NavMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            services: []
        }
    }

    componentDidMount(){
        let storedProducts = JSON.parse(sessionStorage.getItem('productList'));
        let storedServices = JSON.parse(sessionStorage.getItem('serviceList'));
        let products = (storedProducts === null) ? [] : storedProducts;
        let services = (storedServices === null) ? [] : storedServices;
        this.setState({products: products, services: services});
    }

    updateProductList = (productList) => {
        this.setState({ products: productList });
    }

    updateServiceList = (serviceList) => {
        this.setState({ services: serviceList });
    }

    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary fw-bold fixed-top" id="navBar">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <li className="nav-link">
                                    <Link className="nav-item nav-link text-white" to="/home">Inicio</Link>
                                </li>
                                <li className="nav-link nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" href=" " role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Productos
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/products">Ver catálogo</Link></li>
                                        <li> <Link className="dropdown-item" to="/product/create">Crear nuevo producto</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-link nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" href=" " role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Servicios
                                    </a>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="/services">Ver catálogo</Link>
                                        <Link className="dropdown-item" to="/service/create">Crear nuevo servicio</Link>
                                    </div>
                                </li>
                                <li className="nav-link">
                                    <Link className="nav-item nav-link text-white" to="/help">Ayuda</Link>
                                </li>
                                <ShoppingCart productList={this.state.products} serviceList={this.state.services}/>
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
                        <ProductCatalog updateProductList={this.updateProductList} productType="products" products={this.state.products} />
                    </Route>
                    <Route path="/product/:operation/:id?">
                        <ProductForm title="PRODUCTO" />
                    </Route>
                    <Route path="/order">
                        <OrderPreview productList={this.state.products} serviceList={this.state.services} />
                    </Route>
                    <Route path="/services">
                        <ProductCatalog updateServiceList={this.updateServiceList} productType="services" services={this.state.services}/>
                    </Route>
                    <Route path="/service/:operation/:id?">
                        <ProductForm title="SERVICIO" />
                    </Route>
                </Switch>
            </Router>
        );
    }

}

export default NavMenu;