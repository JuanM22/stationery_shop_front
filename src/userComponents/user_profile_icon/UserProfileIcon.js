import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import './UserProfileIcon.css';
import userIcon from '../user_icon.png';

import LoginService from '../../services/LoginServices';
import UserServices from '../../services/UserServices';
import FileServices from '../../services/FileServices';

class UserProfileIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false,
            userId: 0
        }
        this.loginService = new LoginService();
        this.userService = new UserServices();
        this.fileService = new FileServices();
    }

    componentDidMount() {
        this.loginService.getUserId().then(res => {
            if (res > 0 && this.state.userId === 0) this.setState({ userId: res }, () => {
                this.userService.viewUser(this.state.userId).then(user => {
                    if (user !== undefined) {
                        this.fileService.getFiles(user.userPicture).then(image => {
                            var file = new File([image], user.userPicture, { type: image.type });
                            document.getElementById('userPic').src = URL.createObjectURL(file);
                            this.setState({ userPic: file });
                        });
                    }
                });
            });
        });
    }

    logOut = () => {
        this.loginService.logOut().then(res => {
            if (res === 'Log out successfully') {
                this.setState({ loggedOut: true });
            }
        });
    }

    redirectToLogin = () => {
        if (this.state.loggedOut) return (<Redirect to={{ pathname: '/login', state: { sessionStatus: 'loggedOut' } }}></Redirect>)
    }

    render() {
        return (
            <div className="profile-header-container">
                <div className="profile-header-img">
                    <img id="userPic" className="img-circle dropdown-toggle" src={userIcon} alt="user_ph"
                        role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`/user/view/${this.state.userId}`}>Mi Perfil</Link>
                        <Link className="dropdown-item" to="/orders">{this.props.ordersOption}</Link>
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