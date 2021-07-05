import React from 'react';
import './OrderPreview.css';


class OrderPreview extends React.Component {

    render() {
        const orderProductsData = this.props.productList.map((detail) => {
            return (
                <div className="container" key={detail.product.productId}>
                    <h4 className="card-header bg-primary text-white">{detail.product.name}</h4>
                    <div className="form-group row mt-3">
                        <img className="col-sm-3" src="https://www.magisnet.com/wp-content/uploads/2020/05/pagina4libros.jpg" alt="Product pic" />
                        <div className="col-4">
                            <label htmlFor={`${"quantity" + detail.productId}`}>Cantidad</label>
                            <input id={`${"quantity" + detail.productId}`} type="number" value={detail.quantity}
                                className="form-control form-control-sm"/>
                        </div>
                        <div className="col-4">
                            <label htmlFor={`${"quantity" + detail.productId}`}>Color</label>
                            <input id={`${"quantity" + detail.productId}`} value={detail.styleSelected}
                                className="form-control form-control-sm" />
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="container-fluid" id="orderPreview">
                <div className="card">
                    <div className="card-header bg-dark text-white">
                        <h1>Order Preview</h1>
                    </div>
                    <div className="container mt-2">
                        <h3>Productos seleccionados</h3>
                        {orderProductsData}
                    </div>
                </div>
            </div>
        );
    }

}

export default OrderPreview;