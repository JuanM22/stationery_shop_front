import React from 'react';
import './Buttons.css';
import { Link } from 'react-router-dom';

class Buttons extends React.Component {

    render() {
        return (
            <div className="col-4 py-2 mt-4" id="buttonContainer">
                {(this.props.buttonText === 'GUARDAR') ?
                    <button type="submit" className="btn btn-success mt-3 w-25" data-toggle="modal" data-target="#myModal">{this.props.buttonText}</button>
                    :
                    <button type="button" className="btn btn-success mt-3 w-25" onClick={this.props.changeButtonText}>{this.props.buttonText}</button>
                }
                <Link className="btn btn-danger mt-3 mx-3 w-25" to="/home">CANCELAR</Link>
            </div>
        );
    }

}

export default Buttons;