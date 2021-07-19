import React from 'react';
import './ProductCatalog.css';
import {
    Link,
} from "react-router-dom";
import ProductServices from '../services/ProductServices';
import FileServices from '../services/FileServices';
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
            orderServices: this.props.services,
            productImages: []
        }
        this.productService = new ProductServices();
        this.fileService = new FileServices();
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
            const productImages = this.state.productImages;
            for (let product of res) {
                let randomIndex = Math.floor((Math.random() * product.images.length));
                this.fileService.getFiles(product.images[randomIndex]).then(res => {
                    var file = new File([res], product.images[randomIndex], { type: res.type });
                    var src = URL.createObjectURL(file);
                    const info = {
                        src: src,
                        pos: product.productId
                    }
                    productImages.push(info);
                    productImages.sort((a, b) => (a.pos - b.pos));
                    this.setState({ productImages: productImages });
                });
            }
            this.setState({ products: res });
        });
    }

    setProduct = (orderDetail) => {
        const orderProducts = this.state.orderProducts;
        orderProducts.push(orderDetail);
        this.props.updateProductList(this.state.orderProducts);
        sessionStorage.setItem('productList', JSON.stringify(this.state.orderProducts));
        this.setState({ orderProducts: orderProducts });
    }

    setService = (orderDetail) => {
        const orderServices = this.state.orderServices;
        orderServices.push(orderDetail);
        this.props.updateServiceList(this.state.orderServices);
        sessionStorage.setItem('serviceList', JSON.stringify(this.state.orderServices));
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

    async getFirstProductImage(product) {
        var randomIndex = Math.floor((Math.random() * product.images.length));
        var src = null;
        await this.fileService.getFiles(product.images[randomIndex]).then(res => {
            var file = new File([res], product.images[randomIndex], { type: res.type });
            src = URL.createObjectURL(file);
        });
        return src;
    }

    render() {
        const products = this.state.products.map((product, index) => {
            var route = this.props.productType === "products" ? '/product' : '/service';
            return (
                <div className="card mb-2 bg-light" key={product.productId}>
                    <div className="border border-dark">
                        <div className="card-body">
                            <div className="form-group row mt-2">
                                <div className="col-3 bg-dark" id="catalogProductPic">
                                    <img className="img-thumbnail rounded" src={(this.state.productImages[index] !== undefined) ? this.state.productImages[index].src : null} alt="Product pic" />
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