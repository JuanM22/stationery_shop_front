import React from 'react';
import './ProductCatalog.css';
import {
    Link,
} from "react-router-dom";
import ProductServices from '../services/ProductServices';
import FilterComponent from '../filter_compo/FilterComponent';
import ProductPreview from '../product_preview/ProductPreview';

class ProductCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            hide: true,
            product: null
        }
        this.orderProducts = [];
        this.productService = new ProductServices();
    }

    componentDidMount() {
        this.productService.listProducts().then(res => {
            this.setState({ products: res });
        });
    }

    setProduct = (orderDetail) => {
        this.orderProducts.push(orderDetail);
        this.props.updateProductList(this.orderProducts);
    }

    showProductPreview = (product) => {
        this.setState({ hide: false, product: product });
    }

    closeProductPreview = () => this.setState({ hide: true });

    renderProductPreview() {
        if (!this.state.hide) {
            return (
                <div id="addToCartForm">
                    <ProductPreview product={this.state.product} setProduct={this.setProduct} closeProductPreview={this.closeProductPreview} />
                </div>
            )
        }
    }

    render() {
        const products = this.state.products.map((product) => {
            return (
                <div className="card mb-2" key={product.productId}>
                    <div className="card-body bg-secondary border border-dark">
                        <h3 className="card-header bg-primary text-white">{product.name}</h3>
                        <div className="form-group row mt-2 px-3">
                            <img className="col-sm-3" src="https://www.magisnet.com/wp-content/uploads/2020/05/pagina4libros.jpg" alt="Product pic" />
                            <div className="col-sm-8 mx-2 px-0 bg-light text-dark border border-dark">
                                <h4 className="bg-dark text-white border border-dark py-2">Descripción</h4>
                                <p>{product.description}</p>
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <div className="bg-dark col-4 py-2 mx-3 align-self-center">
                                <label className="mx-2 text-white">Precio: </label>
                                <label className="text-white">${product.unitPrice}</label>
                            </div>
                            <Link className="col-2 py-2 mx-3 btn btn-primary text-white" to={"/product/view/" + product.productId}>Ver en detalle</Link>
                            <button className="col-2 py-2 btn btn-success text-white" onClick={() => this.showProductPreview(product)}>Añadir al carrito</button>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div>
                <FilterComponent />
                <div className="container d-block position-absolute" id="catalogContainer">
                    {this.state.products.length > 0 ? products : <div className="alert alert-danger">No hay productos registrados en el sistema</div>}
                </div>
                {this.renderProductPreview()}
            </div>
        );
    }
}

export default ProductCatalog;