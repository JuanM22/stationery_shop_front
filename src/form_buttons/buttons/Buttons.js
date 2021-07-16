import React from 'react';
import './Buttons.css';
import { Link } from 'react-router-dom';

class Buttons extends React.Component {

    render() {
        return (
            <div className="col" id="buttons">
                <button type="submit" className="btn btn-success w-25" data-toggle="modal" data-target="#myModal"
                disabled={this.props.activeForm}>GUARDAR</button>
                <Link className="btn btn-danger w-25" to="/home">CANCELAR</Link>
            </div>
        );
    }

}

export default Buttons;