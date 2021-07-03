import React from 'react';
import './ProductForm.css';
import ProductServices from '../services/ProductServices';

class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            message: ''
        }
        this.productService = new ProductServices();
    }

    saveProduct = (e) => {
        e.preventDefault();
        const product = {
            productId: document.getElementById('code').value,
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
                                <input id="code" type="text" className="form-control form-control-sm" />
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
                    <button type="submit" className="btn btn-success mt-3">GUARDAR</button>
                </form>
            </div>
        );
    }

}

export default ProductForm;