import React from 'react';
import './ProductCatalog.css';
import {
    Link,
} from "react-router-dom";
import ProductServices from '../services/ProductServices';
import FileServices from '../services/FileServices';
import FilterComponent from '../filter_compo/FilterComponent';
import ProductPreview from '../product_preview/ProductPreview';

class ProductCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            hide: true,
            item: null,
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
            this.setState({ productImages: [] });
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

    setItem = (orderDetail) => {
        const data = this.props.chargeOrderInfo();
        if (this.props.productType === "products") this.setProduct(orderDetail, data[0]);
        else this.setService(orderDetail, data[1]);
    }

    setProduct = (orderDetail, productList) => {
        productList.push(orderDetail);
        sessionStorage.setItem('productList', JSON.stringify(productList));
    }

    setService = (orderDetail, serviceList) => {
        serviceList.push(orderDetail);
        sessionStorage.setItem('serviceList', JSON.stringify(serviceList));
    }

    showProductPreview = (item) => {
        this.setState({ hide: false, item: item });
    }

    closePreview = () => this.setState({ hide: true });

    renderProductPreview() {
        if (!this.state.hide) {
            return (
                <div id="addToCartForm">
                    <ProductPreview item={this.state.item} setItem={this.setItem} closePreview={this.closePreview} />
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
        const products = this.state.products.map((item, index) => {
            var route = this.props.productType === "products" ? '/product' : '/service';
            return (
                <div className="card mb-2 bg-dark border border-light bg-gradient" key={item.productId}>
                    <div className="card-body">
                        <div className="form-group row mt-2">
                            <div className="col-3 bg-light mx-2 rounded" id="catalogProductPic">
                                <img className="img-thumbnail rounded border-dark" src={(this.state.productImages[index] !== undefined) ? this.state.productImages[index].src : null} alt="Product pic" />
                                <div className="bg-dark my-2 text-center">
                                    <label className="text-white">Precio: ${item.unitPrice}</label>
                                </div>
                            </div>
                            <div className="col px-0 mx-4 border border-light">
                                <div className="card-title bg-primary bg-gradient text-white fw-bold py-3 text-center">{item.name}</div>
                                <div className="my-5 text-center">
                                    <Link className="btn btn-primary text-white w-25" to={route + "/view/" + item.productId}>Ver en detalle</Link>
                                    <button className="btn btn-success text-white w-25 mx-3" onClick={() => this.showProductPreview(item)}>Añadir al carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            );
        });
        return (
            <div className="container-fluid d-block position-absolute" id="catalogContainer">
                <div className="row">
                    <div className="col-10">
                        {this.state.products.length > 0 ? products : <div className="alert alert-danger">No hay productos registrados en el sistema</div>}
                    </div>
                    <div className="col-2">
                        <FilterComponent />
                    </div>
                    {this.renderProductPreview()}
                </div>
            </div>
        );
    }
}

export default ProductCatalog;