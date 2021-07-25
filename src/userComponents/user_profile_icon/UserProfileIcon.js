import React from 'react';
import { Link } from 'react-router-dom';

import './UserProfileIcon.css';

class UserProfileIcon extends React.Component {

    render() {

        let userId = sessionStorage.getItem("userId");;

        return (
            <div className="profile-header-container">
                <div className="profile-header-img">
                    <img className="img-circle dropdown-toggle" src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png" alt="user ph"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`/user/view/${userId}`}>Mi Perfil</Link>
                        <Link className="dropdown-item" to="/orders">Mis Pedidos</Link>
                        <hr className="dropdown-divider" />
                        <Link className="dropdown-item" to="/login" onClick={this.props.showMenu}>Cerrar Sesión</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfileIcon;