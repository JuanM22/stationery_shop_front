import React from 'react';
import './ProductPreview.css';
import FileServices from '../services/FileServices';
import ImageViewer from '../image_viewer/ImageViewer';

class ProductPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productPics: []
        }
        this.product = this.props.product;
        this.fileService = new FileServices();
    }

    sendOrderDetailData = () => {
        const orderDetail = {
            product: this.product,
            quantity: parseInt(document.getElementById('quantity').value),
            styleSelected: document.getElementById('style').value
        }
        this.props.setProduct(orderDetail);
        this.props.closePreview();
    }

    renderImageViewer() {
        if (this.state.productPics.length > 0) return <ImageViewer productPics={this.state.productPics} options={{ infinite: false }} />
    }

    componentDidMount() {
        const productPics = this.state.productPics;
        for (let fileName of this.product.images) {
            this.fileService.getFiles(fileName).then(res => {
                var file = new File([res], fileName, { type: res.type });
                const info = {
                    src: URL.createObjectURL(file)
                }
                productPics.push(info);
                this.setState({ productPics: productPics });
            });
        }
    }


    render() {
        return (
            <div className="container py-3 my-3 bg-light border border-4 border-warning rounded" id="productPreview">
                <div className="bg-primary text-white">
                    <h3 className="py-2">{this.product.name}</h3>
                </div>
                <div className="form-group row mt-2 py-2 rounded mx-0">
                    {this.renderImageViewer()}
                </div>
                <div className="mt-2">
                    <h3 className="bg-primary text-white py-2 mb-0 border border-dark border-2">Descripción</h3>
                    <p className="py-2 lead border border-top-0 border-dark">{this.product.description}</p>
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

export default ProductPreview;