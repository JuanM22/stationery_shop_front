import React from 'react';
import './SwitchButton.css';

class SwitchButton extends React.Component {

    render() {
        return (
            <div class="form-check form-switch" id="switch">
                <label class="form-check-label" for="flexSwitchCheckDefault">EDITAR</label>
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={this.props.changeFormState}/>
            </div>
        );
    }

}

export default SwitchButton;