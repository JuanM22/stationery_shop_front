import React from 'react';

class TableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableBody: []
        }
    }

    componentDidUpdate(prevProps) {
        if ((this.state.tableBody.length !== this.props.featureList.length) || (prevProps.activeSpecificationForm !== this.props.activeSpecificationForm)) this.createTableBody();
    }

    createTableBody() {
        let tableBody = this.state.tableBody;
        var featureList = this.props.featureList;
        const translations = this.valuesTranslations();
        tableBody = featureList.map((feature, index) => {
            const values = this.mapFeaturesValues(feature);
            return (
                <tr key={index}>
                    <td>{feature.name}</td>
                    <td>{translations[feature.type]}</td>
                    {(values != null) ? <td> <select className="form-control form-control-sm" disabled={this.props.activeSpecificationForm}> {values}</select> </td>
                        : <td>N/A</td>
                    }
                    <td><button className="btn btn-danger" onClick={(e) => this.props.removeFeature(featureList.indexOf(feature), e)} disabled={this.props.activeSpecificationForm}>Quitar</button></td>
                </tr>
            )
        })
        this.setState({ tableBody: tableBody });
    }

    mapFeaturesValues(feature) {
        let values = null;
        if (feature.values !== undefined) {
            values = feature.values.map((value) => {
                return (
                    <option value={value} key={value}>{value}</option>
                )
            });
        }
        return values;
    }

    valuesTranslations() {
        return {
            "text": "Texto",
            "number": "Númerico",
            "select": "Lista Desplegable",
            "check": "Check Box",
            "file": "Archivo"
        }
    }

    render() {
        return (
            <tbody className="text-dark">
                {this.state.tableBody}
            </tbody>
        )
    }

}

export default TableComponent;