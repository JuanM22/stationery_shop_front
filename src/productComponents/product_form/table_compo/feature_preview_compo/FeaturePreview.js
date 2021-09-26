import React from 'react';

import './FeaturePreview.css';

class FeaturePreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showFeatureValuesCombo: true,
            featureValuesList: []
        }
    }

    appendFeature = () => {
        const feature = {
            name: document.getElementById("featureName").value,
            type: document.getElementById("featureType").value,
        }
        const values = this.state.featureValuesList.map((item) => {
            return item.props.value;
        })
        if(values.length > 0) feature.values = values;
        this.props.appenFeatureToList(feature);
    }

    addFeatureValueToList = () => {
        const featureValuesList = this.state.featureValuesList;
        const inputElement = document.getElementById("featureValue")
        const value = inputElement.value;
        const optionTag = <option value={value} key={value}>{value}</option>
        featureValuesList.push(optionTag);
        inputElement.value = "";
        this.setState({ featureValuesList: featureValuesList });
    }

    showFeatureValuesCombo = (e) => {
        if (e.target.value === "select") this.setState({ showFeatureValuesCombo: false });
        else this.setState({ showFeatureValuesCombo: true });
    }

    render() {
        return (
            <div id="featurePreviewContainer">
                <div className="container mt-5">
                    <div className="card">
                        <div className="card-header top-bar-bg bg-gradient text-white fw-bold">Nueva Especificación</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="featureName">Nombre</label>
                                    <input type="text" placeholder="Nombre de la especificación" className="form-control form-control-sm" id="featureName"></input>
                                </div>
                                <div className="col">
                                    <label htmlFor="featureType">Valor permitido</label>
                                    <select className="form-control form-control-sm" onChange={(e) => this.showFeatureValuesCombo(e)} id="featureType">
                                        <option value="none">--Seleccione--</option>
                                        <option value="text">Texto</option>
                                        <option value="number">Númerico</option>
                                        <option value="select">Lista desplegable</option>
                                        <option value="check">Check Box</option>
                                        <option value="file">Archivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-2" hidden={this.state.showFeatureValuesCombo}>
                                <div className="col">
                                    <label htmlFor="featureName">Valores</label>
                                    <select className="form-control form-control-sm">
                                        {this.state.featureValuesList}
                                    </select>
                                </div>
                                <div className="col">
                                    <div className="card mt-4">
                                        <div className="card-header top-bar-bg bg-gradient text-white fw-bold">Agregar nuevo valor a la lista</div>
                                        <div className="card-body">
                                            <div>
                                                <label htmlFor="featureValue">Valor</label>
                                                <input id="featureValue" className="form-control form-control-sm" type="text" placeholder="Ingrese el nuevo valor para la lista"></input>
                                            </div>
                                            <div>
                                                <button className="btn btn-success w-25 mt-2 float-end" onClick={this.addFeatureValueToList}>AGREGAR</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="closeFeaturePreviewBtn">
                                <button className="btn btn-success w-25" onClick={this.appendFeature}>GUARDAR</button>
                                <button className="btn btn-danger w-25 mx-3" onClick={this.props.closeFeaturePreview}>CANCELAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default FeaturePreview;