import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Login from './userComponents/user_login_compo/Login';
import UserProfileViewer from './userComponents/user_profile_viewer/UserProfileViewer';
import NavMenu from './nav_menu/NavMenu';

import ProductForm from './product_form/ProductForm';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hideMenu: true
    }
  }

  renderMenu() {
    if (!this.state.hideMenu) return (<NavMenu showMenu={this.showMenu}/>)
  }

  showMenu = () => {
    let hideMenu = this.state.hideMenu;
    this.setState({ hideMenu: !hideMenu });
  }

  render() {
    return (
      <div>
        <Router>
          {this.renderMenu()}
          <Switch>
            <Route path="/login">
              <Login showMenu={this.showMenu} />
            </Route>
            <Route path="/user/:operation/:id?">
              <UserProfileViewer />
            </Route>
            <Route path="/product/:operation/:id?">
              <ProductForm title="PRODUCTO" />
            </Route>
            <Route path="/service/:operation/:id?">
              <ProductForm title="SERVICIO" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
