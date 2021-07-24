import React from 'react';

class TableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableBody: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rows !== this.props.rows) this.createTableBody();
    }

    enableValueSelect(e, key) {
        if(e.target.value === 'select') document.getElementById('select'+ key).hidden = false;
        else document.getElementById('select'+ key).hidden = true;
    }

    Row = (key) => {
        return (
            <tr key={key}>
                <td><input className="form-control form-control-sm"></input></td>
                <td>
                    <select className="form-control form-control-sm" onChange={(e) => {this.enableValueSelect(e, key)}}>
                        <option value="none">--Seleccione--</option>
                        <option value="text">Texto</option>
                        <option value="number">Númerico</option>
                        <option value="select">Lista desplegable</option>
                        <option value="check">Check Box</option>
                        <option value="file">Archivo</option>
                    </select>
                </td>
                <td>
                    <select className="form-control form-control-sm" id={`select${key}`} hidden>
                        <option>--Seleccione--</option>
                    </select>
                </td>
                <td><button className="btn btn-danger" onClick={(e) => this.removeRow(key, e)}>Quitar</button></td>
            </tr>
        )
    }

    removeRow = (key, e) => {
        e.preventDefault();
        const tableBody = this.state.tableBody;
        var index = tableBody.findIndex(element => element.key === key.toString());
        tableBody.splice(index, 1);
        this.setState({ tableBody: tableBody });
    }

    createTableBody() {
        const tableBody = this.state.tableBody;
        var rows = this.props.rows;
        if (rows > 0) {
            tableBody.push(this.Row(rows));
            this.setState({ tableBody: tableBody });
        }
    }

    render() {
        return (
            <tbody>
                {this.state.tableBody}
            </tbody>
        )
    }

}

export default TableComponent;