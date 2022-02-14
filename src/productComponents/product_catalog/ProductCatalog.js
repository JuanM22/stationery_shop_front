import React from 'react';
import './ProductCatalog.css';
import ProductServices from '../../services/ProductServices';
import FileServices from '../../services/FileServices';
import FilterComponent from '../../filter_compo/FilterComponent';
import ProductPreview from '../product_preview/ProductPreview';
import ProductCard from './product_card/ProductCard';

class ProductCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            hide: true,
            item: null,
            productImages: [],
            itemCounter: 0
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
        this.props.itemAdded();
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
                <ProductPreview item={this.state.item} setItem={this.setItem} closePreview={this.closePreview} />
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
            const data = {
                item: item,
                route: route,
                src: (this.state.productImages[index] !== undefined) ? this.state.productImages[index].src : null
            }
            return (
                <ProductCard userType={this.props.userType} data={data} key={item.productId} showProductPreview={this.showProductPreview} />
            );
        });

        const emptyListMessage = (this.props.productType === "products") ? "No hay productos registrados en el sistema" : "No hay servicios registrados en el sistema";

        return (
            <div className="container-fluid position-absolute" id="catalogContainer">
                <div className="row">
                    <div className="col-10 row mx-2 form-bg p-4 rounded">
                        {this.state.products.length > 0 ? products : <div className="alert alert-danger">{emptyListMessage}</div>}
                    </div>
                    <div className="col">
                        <FilterComponent />
                    </div>
                    {this.renderProductPreview()}
                </div>
            </div>
        );
    }
}

export default ProductCatalog;