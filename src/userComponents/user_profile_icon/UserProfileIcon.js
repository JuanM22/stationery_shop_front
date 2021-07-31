import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import './UserProfileIcon.css';

import LoginService from '../../services/LoginServices';

class UserProfileIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false,
            userId: 0
        }
        this._isMounted = false;
        this.loginService = new LoginService();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentDidUpdate(prevProps) {
        if (this._isMounted) {
            this.loginService.getUserId().then(res => {
                this.setState({ userId: res });
            });
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    logOut = () => {
        this.loginService.logOut().then(res => {
            if (res === 'Log out successfully') {
                this.setState({ loggedOut: true });
            }
        });
    }

    redirectToLogin = () => {
        if (this.state.loggedOut) return (<Redirect to='/login'></Redirect>)
    }

    render() {

        return (
            <div className="profile-header-container">
                <div className="profile-header-img">
                    <img className="img-circle dropdown-toggle" src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png" alt="user ph"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`/user/view/${this.state.userId}`}>Mi Perfil</Link>
                        <Link className="dropdown-item" to="/orders">Mis Pedidos</Link>
                        <hr className="dropdown-divider" />
                        <button className="dropdown-item" onClick={this.logOut}>Cerrar Sesión</button>
                    </div>
                </div>
                {this.redirectToLogin()}
            </div>
        )
    }
}

export default UserProfileIcon;