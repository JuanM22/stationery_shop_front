import React from 'react';

const NavMenu = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active text-white" aria-current="page" href="www.google.com">Inicio</a>
                        <a className="nav-link text-white" href="www.google.com">Productos</a>
                        <a className="nav-link text-white" href="www.google.com">Servicios</a>
                    </div>
                </div>
            </div>
        </nav>
    );

}

export default NavMenu;