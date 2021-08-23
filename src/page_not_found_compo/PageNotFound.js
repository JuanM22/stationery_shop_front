import React from 'react';
import './PageNotFound.css';
import hamsterOnWheel from './hamster_wheel.gif';

const PageNotFound = (props) => {

    return (
        <div className="errorMessageContainer">
            <img className="icon" src={hamsterOnWheel} alt="hamster running on wheel"></img>
            <h1>¡404! Página no encontrada</h1>
        </div >
    )


}

export default PageNotFound;