import React from 'react';
import './SwitchButton.css';

class SwitchButton extends React.Component {

    render() {
        return (
            <div className="form-check form-switch rounded py-1" id="switch">
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">EDITAR</label>
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={this.props.changeFormState}/>
            </div>
        );
    }

}

export default SwitchButton;