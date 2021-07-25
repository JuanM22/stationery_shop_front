import React from 'react';
import {
    Route,
    Link
} from "react-router-dom";
import ShoppingCart from './shopping_cart_compo/ShoppingCart';
import UserProfileIcon from '../userComponents/user_profile_icon/UserProfileIcon';
import ProductCatalog from '../product_catalog/ProductCatalog';
import OrderPreview from '../order_preview/OrderPreview';
import OrderList from '../order_list_component/OrderList';

class NavMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            services: []
        }
    }

    componentDidMount() {
        let storedProducts = JSON.parse(sessionStorage.getItem('productList'));
        let storedServices = JSON.parse(sessionStorage.getItem('serviceList'));
        let products = (storedProducts === null) ? [] : storedProducts;
        let services = (storedServices === null) ? [] : storedServices;
        this.setState({ products: products, services: services });
    }

    updateProductList = (productList) => {
        this.setState({ products: productList });
    }

    updateServiceList = (serviceList) => {
        this.setState({ services: serviceList });
    }

    render() {
        return (
            <div>
                <Route path="/products">
                    <ProductCatalog updateProductList={this.updateProductList} productType="products" products={this.state.products} />
                </Route>
                <Route path="/order">
                    <OrderPreview productList={this.state.products} serviceList={this.state.services} />
                </Route>
                <Route path="/orders">
                    <OrderList />
                </Route>
                <Route path="/services">
                    <ProductCatalog updateServiceList={this.updateServiceList} productType="services" services={this.state.services} />
                </Route>
                <nav className="navbar navbar-expand-lg navbar-dark bg-success bg-gradient fw-bold fixed-top" id="navBar">
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
                                <ShoppingCart productList={this.state.products} serviceList={this.state.services} />
                                <UserProfileIcon showMenu={this.props.showMenu}/>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        );
    }

}

export default NavMenu;