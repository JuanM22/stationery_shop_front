import React from 'react';
import './ServicePreview.css';

class ServicePreview extends React.Component {

    service = this.props.service;

    sendOrderDetailData = () => {
        const orderDetail = {
            service: this.service,
            quantity: parseInt(document.getElementById('quantity').value),
            styleSelected: document.getElementById('style').value
        }
        this.props.setService(orderDetail);
        this.props.closePreview();
    }

    render() {
        return (
            <div className="container" id="servicePreview">
                <h1 className="py-2">{this.service.name}</h1>
                <div className="bg-dark">
                    <img className="col-sm-3 my-2" src="https://www.magisnet.com/wp-content/uploads/2020/05/pagina4libros.jpg" alt="Product pic" />
                </div>
                <div className="form-group row my-2 mx-3">
                    <h3>Descripción</h3>
                    <p>{this.service.description}</p>
                </div>
                <div className="form-group row my-2 mx-3">
                    <div className="col-sm">
                        <label>Cantidad</label>
                        <input min="0" max="100" className="form-control form-control-sm" type="number" id="quantity" />
                    </div>
                    <div className="col-sm">
                        <label>Color</label>
                        <select className="form-control form-control-sm" id='style'>
                            <option>--Seleccione--</option>
                            <option>ROJO</option>
                            <option>VERDE</option>
                            <option>AZUL</option>
                            <option>AMARILLO</option>
                        </select>
                    </div>
                </div>
                <div id="closePreviewBtn">
                    <button className="btn btn-success w-25" onClick={this.sendOrderDetailData}>Agregar</button>
                    <button className="btn btn-danger text-white w-25 mx-3" onClick={this.props.closePreview}>Cerrar</button>
                </div>
            </div>
        );
    }

}

export default ServicePreview;