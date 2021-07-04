import React from 'react';
import './ProductForm.css';
import ProductServices from '../services/ProductServices';
import { withRouter } from 'react-router-dom';

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
        let productId = 0;
        if (operation === 'view') {
            const id = this.props.match.params.id;
            productId = id;
            this.productService.viewProduct(id).then(res => {
                document.getElementById('code').value = res.productId;
                document.getElementById('name').value = res.name;
                document.getElementById('description').value = res.description;
                document.getElementById('unitPrice').value = res.unitPrice;
            });
            text = 'EDITAR';
        } else {
            this.cleanFields();
        }
        this.setState({ buttonText: text, productId: productId });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.operation === 'create') this.cleanFields()
    }

    saveProduct = (e) => {
        e.preventDefault();
        alert(this.state.productId);
        const product = {
            productId: parseInt(this.state.productId),
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            unitPrice: parseFloat(document.getElementById('unitPrice').value),
            images: ['prueba1.png', 'prueba2.png']
        };
        this.productService.saveProduct(product).then(res => {
            this.setState({
                message: res,
                hide: false
            }
            );
            setTimeout(() => this.setState({ hide: true }), 2000);
        });
    }

    changeButtonText = (e) => {
        e.preventDefault();
        this.setState({ buttonText: 'GUARDAR' });
    }

    cleanFields() {
        document.getElementById('code').value = '';
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('unitPrice').value = '';
    }

    render() {
        return (
            <div className="container-fluid" id="formContainer">
                <div className="alert alert-success" hidden={this.state.hide}>{this.state.message}</div>
                <form className="bg-light" onSubmit={this.saveProduct}>
                    <div className="card">
                        <div className="card-header bg-dark text-white text-center">PRODUCTO</div>
                    </div>
                    <div className="form-group mx-3">
                        <div className="row mt-3">
                            <div className="col-4">
                                <label htmlFor="code">Código</label>
                                <input id="code" type="text" className="form-control form-control-sm" readOnly />
                            </div>
                            <div className="col-4">
                                <label htmlFor="name">Nombre</label>
                                <input id="name" type="text" className="form-control form-control-sm" />
                            </div>
                            <div className="col-4">
                                <label htmlFor="unitPrice">Precio Unitario</label>
                                <input id="unitPrice" type="text" className="form-control form-control-sm" />
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
                    <div className="form-group mt-3 mx-3">
                        {(this.state.buttonText === 'GUARDAR') ?
                            <button type="submit" className="btn btn-success mt-3">{this.state.buttonText}</button>
                            :
                            <button type="button" className="btn btn-success mt-3" onClick={this.changeButtonText}>{this.state.buttonText}</button>
                        }
                        <button type="button" className="btn btn-danger mt-3 mx-3">CANCELAR</button>
                    </div>
                </form>
            </div>
        );
    }

}

export default withRouter(ProductForm);