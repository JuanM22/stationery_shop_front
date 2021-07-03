import React from 'react';
import './ProductCatalog.css';
import ProductServices from '../services/ProductServices';

class ProductCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
        this.productService = new ProductServices();
    }

    componentDidMount() {
        this.productService.listProducts().then(res => {
            this.setState({ products: res });
        });
    }

    onDetailButtonClick(id) {
        alert(id);
    }

    render() {
        const products = this.state.products.map((product) => {
            return (
                <div className="card mb-2" key={product.productId}>
                    <div className="card-body">
                        <h3 className="card-header bg-info text-white">{product.name}</h3>
                        <div className="form-group row mt-2 px-3">
                            <img className="col-sm-3 border border-light" src="https://www.magisnet.com/wp-content/uploads/2020/05/pagina4libros.jpg" alt="Product pic" />
                            <div className="col-sm-8 mx-2 px-0 border border-dark">
                                <h4 className="bg-dark text-light border border-light py-2">Descripción</h4>
                                <p>{product.description}</p>
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <div className="bg-dark col-4 py-2 mx-3 align-self-center">
                                <label className="mx-2 text-white">Precio: </label>
                                <label className="text-white">${product.unitPrice}</label>
                            </div>
                            <button className="col-2 py-2 mx-3 btn btn-success text-white" onClick={() => this.onDetailButtonClick(product.productId)}>Ver en detalle</button>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="container d-block position-absolute" id="catalogContainer">
                {this.state.products.length > 0 ? products : <div className="text text-danger">No hay productos registrados en el sistema</div>}
            </div>
        );
    }
}

export default ProductCatalog;