import React from 'react';
import { withRouter } from 'react-router-dom';
import './ProductForm.css';
import ProductServices from '../services/ProductServices';
import FileServices from '../services/FileServices';
import SuccessMessage from '../custom_messages/success_message_compo/SuccessMessage';
import Buttons from '../form_buttons/buttons/Buttons';
import SwitchButton from '../form_buttons/switch/SwitchButton';
import ImageViewer from '../image_viewer/ImageViewer';

class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeForm: false,
            hide: true,
            message: '',
            productId: 0,
            productPics: [],
            submited: false
        }
        this.productService = new ProductServices();
        this.fileService = new FileServices();
    }

    componentDidMount() {
        const operation = this.props.match.params.operation;
        if (operation === 'view') {
            const productId = this.props.match.params.id;
            this.productService.viewProduct(productId).then(res => {
                this.setState({ productId: res.productId });
                document.getElementById('name').value = res.name;
                document.getElementById('stock').value = res.stock;
                document.getElementById('description').value = res.description;
                document.getElementById('unitPrice').value = res.unitPrice;
                const productPics = this.state.productPics;
                for (let fileName of res.images) {
                    this.fileService.getFiles(fileName).then(res => {
                        var file = new File([res], fileName, { type: res.type });
                        const productPic = {
                            file: file,
                            src: URL.createObjectURL(file)
                        };
                        productPics.push(productPic);
                        this.setState({ productPics: productPics });
                    });
                }
            });
            this.setState({ activeForm: true });
        } else {
            this.cleanFields();
        }
    } 1

    componentDidUpdate(prevProps) {
        if (this.props.match.params.operation === 'create' && this.state.submited) this.cleanFields();
    }

    saveProduct = (e) => {
        e.preventDefault();
        const product = {
            productId: this.state.productId,
            name: document.getElementById('name').value,
            stock: parseInt(document.getElementById('stock').value),
            description: document.getElementById('description').value,
            unitPrice: parseFloat(document.getElementById('unitPrice').value),
            images: [],
            type: (this.props.title === "PRODUCTO") ? 'products' : 'services'
        };
        this.fileService.saveFiles(this.state.productPics).then(res => {
            console.log(res);
            if (res === "files saved successfully") {
                for (var pic of this.state.productPics) {
                    product.images.push(pic.file.name);
                }
                console.log(product);
                this.productService.saveProduct(product).then(res => {
                    this.setState({ message: res, hide: false, submited: true });
                });
            }
        })
    }

    renderSwitchButton() {
        if (this.props.match.params.operation === 'view') {
            return (<SwitchButton changeFormState={this.changeFormState} />)
        }
    }

    changeFormState = () => {
        this.setState({ activeForm: !this.state.activeForm });
    }

    cleanFields() {
        document.getElementById('name').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('description').value = '';
        document.getElementById('unitPrice').value = '';
    }

    renderImageViewer() {
        if (this.state.productPics.length > 0) return <ImageViewer productPics={this.state.productPics} options={{ infinite: false }} />
    }

    async loadFile(e) {
        const file = e.target.files[0];
        const productPics = this.state.productPics;
        const productPic = {
            file: null,
            src: URL.createObjectURL(file)
        }
        let blob = null;
        await this.createBlob(productPic).then(res => blob = res);
        var newFile = new File([blob], file.name, { type: blob.type });
        productPic.file = newFile;
        productPics.push(productPic);
        e.target.value = null;
        this.setState({ productPics: productPics });
    };

    async createBlob(productPic) {
        let blob = null;
        blob = await fetch(productPic.src).then(r => r.blob());
        return blob;
    }

    render() {
        return (
            <div className="container-fluid" id="formContainer">
                <div className="text-center" hidden={this.state.hide}>
                    <SuccessMessage message={this.state.message} />
                </div>
                <div className="card">
                    <form className="text-white fw-bold" onSubmit={this.saveProduct}>
                        <div className="card-header bg-dark text-white text-center fw-bold">
                            <h3 className="card-title">{this.props.title}</h3>
                        </div>
                        <div className="card-body bg-secondary">
                            {this.renderSwitchButton()}
                            <div className="form-group mx-3">
                                <div className="row">
                                    <div className={this.props.title === 'PRODUCTO' ? "col-4" : "col"}>
                                        <label htmlFor="name">Nombre</label>
                                        <input id="name" type="text" className="form-control form-control-sm" readOnly={this.state.activeForm} />
                                    </div>
                                    <div className="col-4" hidden={this.props.title !== 'PRODUCTO'}>
                                        <label htmlFor="name">Stock</label>
                                        <input id="stock" type="number" className="form-control form-control-sm" readOnly={this.state.activeForm} />
                                    </div>
                                    <div className={this.props.title === 'PRODUCTO' ? "col-4" : "col"}>
                                        <label htmlFor="unitPrice">Precio</label>
                                        <input id="unitPrice" type="number" className="form-control form-control-sm" readOnly={this.state.activeForm} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3 mx-3">
                                <label htmlFor="description">Descripción</label>
                                <textarea className="form-control" id="description" rows="3" readOnly={this.state.activeForm}></textarea>
                            </div>
                            <div className="form-group mt-3 mx-3">
                                <label>Imagenes</label>
                                <div className="form-group row mt-2 bg-dark py-2 rounded mx-0">
                                    {this.renderImageViewer()}
                                </div>
                                <div className="form-group row mt-3 py-2">
                                    <div className="col">
                                        <input id="image" type="file" className="form-control-file" onChange={(e) => { this.loadFile(e) }} disabled={this.state.activeForm} />
                                    </div>
                                    <Buttons activeForm={this.state.activeForm} changeButtonText={this.changeButtonText} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default withRouter(ProductForm);