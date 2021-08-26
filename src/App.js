import React from 'react';
import {
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

import LoginService from './services/LoginServices';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hideMenu: true,
      itemCounter: 0
    };
    this._isMounted = false;
    this.loginService = new LoginService();
  }

  componentDidMount() {
    this._isMounted = true;
    const data = this.chargeOrderInfo();
    this.setState({ products: data[0], services: data[1] });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this._isMounted && this.state.hideMenu) {
      this.loginService.userIsLoggedIn().then(res => {
        const data = this.chargeOrderInfo();
        this.setState({ hideMenu: !res, products: data[0], services: data[1] });
      });
    }
  }

  logOutHideMenu = () => {
    this.setState({ hideMenu: true });
  }

  chargeOrderInfo() {
    let storedProducts = JSON.parse(sessionStorage.getItem('productList'));
    let storedServices = JSON.parse(sessionStorage.getItem('serviceList'));
    let products = (storedProducts === null) ? [] : storedProducts;
    let services = (storedServices === null) ? [] : storedServices;
    return [products, services];
  }

  itemAdded = () => {
    let itemCounter = this.state.itemCounter;
    this.setState({ itemCounter: itemCounter + 1 });
  }
  
  sessionStorageCleared = () => {
    this.setState({ itemCounter: 0 });
  }

  renderMenu() {
    if (!this.state.hideMenu) return (<NavMenu ></NavMenu>);
  }

  render() {
    return (
      <div className="appContainer">
        {this.renderMenu()}
        <Switch>
          <Route exact path="/login">
            <Login logOutHideMenu={this.logOutHideMenu} />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/user/:operation/:id?">
            <UserProfileViewer />
          </Route>
          <Route exact path="/products">
            <ProductCatalog productType="products" chargeOrderInfo={this.chargeOrderInfo} itemAdded={this.itemAdded}/>
          </Route>
          <Route exact path="/order">
            <OrderPreview chargeOrderInfo={this.chargeOrderInfo} sessionStorageCleared={this.sessionStorageCleared}/>
          </Route>
          <Route exact path="/orders">
            <OrderList />
          </Route>
          <Route exact path="/services">
            <ProductCatalog productType="services" chargeOrderInfo={this.chargeOrderInfo} />
          </Route>
          <Route exact path="/product/:operation/:id?">
            <ProductForm title="PRODUCTO" />
          </Route>
          <Route exact path="/service/:operation/:id?">
            <ProductForm title="SERVICIO" />
          </Route>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    );
  }

}

export default App;
