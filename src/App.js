import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavMenu from './nav_menu/NavMenu';
import UserProfileViewer from './userComponents/user_profile_viewer/UserProfileViewer';
import ProductForm from './product_form/ProductForm';
import Home from './home_compo/Home';
import Login from './userComponents/user_login_compo/Login';
import ProductCatalog from './product_catalog/ProductCatalog';
import OrderPreview from './order_preview/OrderPreview';
import OrderList from './order_list_component/OrderList';
import PageNotFound from './page_not_found_compo/PageNotFound';

class App extends React.Component {

  constructor(props) {
    super(props);
    const logged = localStorage.getItem("logged");
    this.state = {
      hideMenu: (logged === null) ? true : false,
      products: [],
      services: []
    }
  }

  componentDidMount() {
    let storedProducts = JSON.parse(localStorage.getItem('productList'));
    let storedServices = JSON.parse(localStorage.getItem('serviceList'));
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

  showMenu = () => {
    this.setState({hideMenu: localStorage.getItem("logged") === null});
  }

  renderMenu() {
    if (!this.state.hideMenu) return (<NavMenu products={this.state.products} services={this.state.services} showMenu={this.showMenu}></NavMenu>);
  }

  render() {
    return (
      <div>
        <Router>
          {this.renderMenu()}
          <Switch>
            <Route exact path="/login">
              <Login showMenu={this.showMenu}/>
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/user/:operation/:id?">
              <UserProfileViewer />
            </Route>
            <Route exact path="/products">
              <ProductCatalog updateProductList={this.updateProductList} productType="products" products={this.state.products} />
            </Route>
            <Route exact path="/order">
              <OrderPreview productList={this.state.products} serviceList={this.state.services} />
            </Route>
            <Route exact path="/orders">
              <OrderList />
            </Route>
            <Route exact path="/services">
              <ProductCatalog updateServiceList={this.updateServiceList} productType="services" services={this.state.services} />
            </Route>
            <Route exact path="/product/:operation/:id?">
              <ProductForm title="PRODUCTO" />
            </Route>
            <Route exact path="/service/:operation/:id?">
              <ProductForm title="SERVICIO" />
            </Route>
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
