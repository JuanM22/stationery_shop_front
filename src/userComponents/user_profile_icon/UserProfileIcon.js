import React from 'react';
import { Link } from 'react-router-dom';

import './UserProfileIcon.css';

class UserProfileIcon extends React.Component {

    render() {
        return (
            <div className="profile-header-container">
                <div className="profile-header-img">
                    <img className="img-circle dropdown-toggle" src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png" alt="user ph"
                        role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/userProfile/view/1">Mi Perfil</Link>
                        <Link className="dropdown-item" to="/orders">Mis Pedidos</Link>
                        <hr className="dropdown-divider" />
                        <label className="dropdown-item">Cerrar Sesión</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfileIcon;