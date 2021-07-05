import React from 'react';
import './ProductForm.css';
import ProductServices from '../services/ProductServices';
import SuccessMessage from '../custom_messages/success_message_compo/SuccessMessage';
import { withRouter } from 'react-router-dom';
import Buttons from '../form_buttons/Buttons';

class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonText: 'GUARDAR',
            hide: true,
            message: '',
            productId: 0
        }
        this.productService = new ProductServices();
    }

    componentDidMount() {
        const operation = this.props.match.params.operation;
        let text = 'GUARDAR';
        if (operation === 'view') {
            const productId = this.props.match.params.id;
            this.productService.viewProduct(productId).then(res => {
                this.setState({ productId: res.productId });
                document.getElementById('name').value = res.name;
                document.getElementById('stock').value = res.stock;
                document.getElementById('description').value = res.description;
                document.getElementById('unitPrice').value = res.unitPrice;
            });
            text = 'EDITAR';
        } else {
            this.cleanFields();
        }
        this.setState({ buttonText: text });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.operation === 'create') this.cleanFields()
    }

    saveProduct = (e) => {
        e.preventDefault();
        const product = {
            productId: this.state.productId,
            name: document.getElementById('name').value,
            stock: parseInt(document.getElementById('stock').value),
            description: document.getElementById('description').value,
            unitPrice: parseFloat(document.getElementById('unitPrice').value),
            images: ['prueba1.png', 'prueba2.png']
        };
        this.productService.saveProduct(product).then(res => {
            this.setState({ message: res, hide: false });
        });
    }

    changeButtonText = (e) => {
        e.preventDefault();
        this.setState({ buttonText: 'GUARDAR' });
    }

    cleanFields() {
        document.getElementById('name').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('description').value = '';
        document.getElementById('unitPrice').value = '';
    }

    render() {
        return (
            <div className="container-fluid" id="formContainer">
                <div className="text-center" hidden={this.state.hide}>
                    <SuccessMessage message={this.state.message} />
                </div>
                <form className="bg-secondary text-white" onSubmit={this.saveProduct}>
                    <div className="card">
                        <div className="card-header bg-dark text-white text-center">PRODUCTO</div>
                    </div>
                    <div className="form-group mx-3">
                        <div className="row mt-3">
                            <div className="col-4">
                                <label htmlFor="name">Nombre</label>
                                <input id="name" type="text" className="form-control form-control-sm" />
                            </div>
                            <div className="col-4">
                                <label htmlFor="name">Stock</label>
                                <input id="stock" type="number" className="form-control form-control-sm" />
                            </div>
                            <div className="col-4">
                                <label htmlFor="unitPrice">Precio Unitario</label>
                                <input id="unitPrice" type="number" className="form-control form-control-sm" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mt-3 mx-3">
                        <label htmlFor="description">Descripción</label>
                        <textarea className="form-control" id="description" rows="3"></textarea>
                    </div>
                    <div className="form-group mt-3 mx-3">
                        <label>Imagenes</label>
                        <input id="image" type="file" className="form-control-file" />
                    </div>
                    <Buttons buttonText={this.state.buttonText} changeButtonText={this.changeButtonText} />
                </form>
            </div>
        );
    }

}

export default withRouter(ProductForm);