import React from 'react';
import './ProductCatalog.css';
import {
    Link,
} from "react-router-dom";
import ProductServices from '../services/ProductServices';
import FilterComponent from '../filter_compo/FilterComponent';
import ProductPreview from '../product_preview/ProductPreview';
import ServicePreview from '../servicePreview/ServicePreview';

class ProductCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            hide: true,
            product: null,
            orderProducts: this.props.products,
            orderServices: this.props.services
        }
        this.productService = new ProductServices();
    }

    componentDidMount() {
        this.showCatalog();
    }

    componentDidUpdate(prevProps) {
        if (this.props.productType !== prevProps.productType) {
            this.showCatalog();
        }
    }

    showCatalog() {
        const productType = this.props.productType;
        this.productService.listProducts(productType).then(res => {
            this.setState({ products: res });
        });
    }

    setProduct = (orderDetail) => {
        const orderProducts = this.state.orderProducts;
        orderProducts.push(orderDetail);
        this.props.updateProductList(this.state.orderProducts);
        localStorage.setItem('productList', JSON.stringify(this.state.orderProducts));
        this.setState({ orderProducts: orderProducts });
    }

    setService = (orderDetail) => {
        const orderServices = this.state.orderServices;
        orderServices.push(orderDetail);
        this.props.updateServiceList(this.state.orderServices);
        localStorage.setItem('serviceList', JSON.stringify(this.state.orderServices));
        this.setState({ orderServices: orderServices });
    }

    showProductPreview = (product) => {
        this.setState({ hide: false, product: product });
    }

    closePreview = () => this.setState({ hide: true });

    renderProductPreview() {
        if (!this.state.hide) {
            return (
                <div id="addToCartForm">
                    {this.props.productType === 'products' ?
                        <ProductPreview product={this.state.product} setProduct={this.setProduct} closePreview={this.closePreview} />
                        :
                        <ServicePreview service={this.state.product} setService={this.setService} closePreview={this.closePreview} />
                    }
                </div>
            )
        }
    }

    render() {
        const products = this.state.products.map((product) => {
            var route = this.props.productType === "products" ? '/product' : '/service'
            return (
                <div className="card mb-2 bg-light" key={product.productId}>
                    <div className="border border-dark">
                        <div className="card-body">
                            <div className="form-group row mt-2">
                                <div className="col-3">
                                    <img className="img-thumbnail rounded float-start" src="https://www.magisnet.com/wp-content/uploads/2020/05/pagina4libros.jpg" alt="Product pic" />
                                    <div className="bg-dark mt-2">
                                        <label className="text-white">Precio: ${product.unitPrice}</label>
                                    </div>
                                </div>
                                <div className="col px-0 mx-4 border border-dark">
                                    <div className="card-title bg-primary text-white fw-bold py-3">{product.name}</div>
                                    <div className="my-5">
                                        <Link className="btn btn-primary text-white w-25" to={route + "/view/" + product.productId}>Ver en detalle</Link>
                                        <button className="btn btn-success text-white w-25 mx-3" onClick={() => this.showProductPreview(product)}>Añadir al carrito</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            );
        });
        return (
            <div>
                <FilterComponent />
                <div className="container d-block position-absolute" id="catalogContainer">
                    {this.state.products.length > 0 ? products : <div className="alert alert-danger">No hay productos registrados en el sistema</div>}
                </div>
                {this.renderProductPreview()}
            </div >
        );
    }
}

export default ProductCatalog;