import React from 'react';
import './ProductPreview.css';
import FileServices from '../services/FileServices';
import ImageViewer from '../image_viewer/ImageViewer';

class ProductPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productPics: [],
            customFields: []
        }
        this.product = this.props.product;
        this.fileService = new FileServices();
    }

    sendOrderDetailData = () => {
        const orderDetail = {
            product: this.product,
            quantity: parseInt(document.getElementById('quantity').value),
            features: []
        }
        this.extractCustomInputValues(orderDetail.features);
        this.extractCustomComboBoxValues(orderDetail.features);
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

    extractCustomInputValues(features) {
       const inputs = document.getElementById('customFieldsContainer').getElementsByTagName('input');
       for (let i = 0; i < inputs.length; i++) {
            var item = inputs[i];
            features.push({name: item.id, value: item.value});
        }
    }

    extractCustomComboBoxValues(features) {
        const inputs = document.getElementById('customFieldsContainer').getElementsByTagName('select');
        for (let i = 0; i < inputs.length; i++) {
             var item = inputs[i];
             features.push({name: item.id, value: item.value});
        }
     }

    createInputField(feature) {
        const inputClass = (feature.type === "file") ? "form-control-file" : "form-control form-control-sm"
        return (
            <div className="col my-2" key={feature.name}>
                <label htmlFor={feature.name} className="mx-2">{feature.name}</label>
                <input type={feature.type} className={inputClass} id={feature.name}></input>
            </div>
        )
    }

    createComboBoxField(feature) {
        return (
            <div className="col my-2" key={feature.name}>
                <label htmlFor={feature.name}>{feature.name}</label>
                <select className="form-control form-control-sm" id={feature.name}>
                    {feature.values.map((item, index) => {
                        return (<option value={item} key={index}>{item}</option>)
                    })}
                </select>
            </div>
        )
    }

    render() {

        const customFields = this.props.product.featureList.map((feature, index) => {
            return (feature.type === 'select') ? this.createComboBoxField(feature) : this.createInputField(feature);
        });

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
                    <div className="col-4">
                        <label>Cantidad</label>
                        <input min="0" max="100" className="form-control form-control-sm" type="number" id="quantity" />
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header bg-primary bg-gradient text-white fw-bold">Especificaciones adicionales</div>
                            <div className="card-body" id="customFieldsContainer">
                                {customFields}
                            </div>
                        </div>
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