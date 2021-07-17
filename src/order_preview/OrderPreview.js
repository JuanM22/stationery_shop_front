import React from 'react';
import './OrderPreview.css';


class OrderPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productList: this.props.productList,
            serviceList: this.props.serviceList
        }
    }

    changeDetailQuantity(detail, e) {
        const newQuantity = e.target.value;
        detail.quantity = newQuantity;
        const productList = this.state.productList;
        const index = productList.indexOf(detail);
        productList[index] = detail;
        this.setState({ productList: productList });
    }


    render() {

        let orderProductsData = this.state.productList.map((detail) => {
            return (
                <div className="card" key={detail.product.productId}>
                    <h4 className="card-header bg-primary text-white">{detail.product.name}</h4>
                    <div className="form-group row mt-3">
                        <div className="col-2 pb-3">
                            <img className="mx-3 img-thumbnail border border-dark rounded" src="https://www.magisnet.com/wp-content/uploads/2020/05/pagina4libros.jpg" alt="Product pic" />
                        </div>
                        <div className="col">
                            <div className="form-group row mx-2">
                                <div className="col">
                                    <label htmlFor={`${"quantity" + detail.product.productId}`}>Cantidad</label>
                                    <input id={`${"quantity" + detail.product.productId}`} type="number" value={detail.quantity} min="1"
                                        className="form-control form-control-sm" onChange={(e) => this.changeDetailQuantity(detail, e)} />
                                </div>
                                <div className="col">
                                    <label htmlFor={`${"quantity" + detail.productId}`}>Color</label>
                                    <input id={`${"quantity" + detail.productId}`} value={detail.styleSelected} readOnly
                                        className="form-control form-control-sm" />
                                </div>
                            </div>
                            <div className="form-group row mx-2 mt-2">
                                <div className="col-6">
                                    <label htmlFor={`${"price" + detail.product.productId}`}>Valor</label>
                                    <input id={`${"price" + detail.product.productId}`} value={detail.quantity * detail.product.unitPrice}
                                        className="form-control form-control-sm" readOnly/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        let orderServicesData = this.state.serviceList.map((detail) => {
            return (
                <div className="card" key={detail.service.productId}>
                    <h4 className="card-header bg-primary text-white">{detail.service.name}</h4>
                    <div className="form-group row mt-3">
                        <div className="col-2 pb-3">
                            <img className="mx-3 img-thumbnail border border-dark rounded float-start" src="https://www.magisnet.com/wp-content/uploads/2020/05/pagina4libros.jpg" alt="Product pic" />
                        </div>
                        <div className="col">
                            <div className="form-group row mx-2">
                                <div className="col">
                                    <label htmlFor={`${"quantity" + detail.service.productId}`}>Cantidad</label>
                                    <input id={`${"quantity" + detail.service.productId}`} type="number" value={detail.quantity} min="1"
                                        className="form-control form-control-sm" onChange={(e) => this.changeDetailQuantity(detail, e)} />
                                </div>
                                <div className="col">
                                    <label htmlFor={`${"quantity" + detail.service.productId}`}>Color</label>
                                    <input id={`${"quantity" + detail.service.productId}`} value={detail.styleSelected} readOnly
                                        className="form-control form-control-sm" />
                                </div>
                            </div>
                            <div className="form-group row mx-2 mt-2">
                                <div className="col-6">
                                    <label htmlFor={`${"price" + detail.service.productId}`}>Valor</label>
                                    <input id={`${"price" + detail.service.productId}`} value={detail.quantity * detail.service.unitPrice}
                                        className="form-control form-control-sm" readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="container-fluid" id="orderPreview">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h1>Tu pedido</h1>
                    </div>
                    <div className="container-fluid mt-2">
                        <div className="card">
                            <div className="card-header bg-dark text-white">
                                <h3>Productos seleccionados</h3>
                            </div>
                            <div className="card-body">
                                {orderProductsData}
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid mt-2">
                        <div className="card">
                            <div className="card-header bg-dark text-white">
                                <h3>Servicios seleccionados</h3>
                            </div>
                            <div className="card-body">
                                {orderServicesData}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default OrderPreview;