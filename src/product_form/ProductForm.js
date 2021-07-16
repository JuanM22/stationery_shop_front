import React from 'react';
import './ProductForm.css';
import ProductServices from '../services/ProductServices';
import SuccessMessage from '../custom_messages/success_message_compo/SuccessMessage';
import { withRouter } from 'react-router-dom';
import Buttons from '../form_buttons/buttons/Buttons';
import SwitchButton from '../form_buttons/switch/SwitchButton';

class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeForm: false,
            hide: true,
            message: '',
            productId: 0
        }
        this.productService = new ProductServices();
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
            });
            this.setState({ activeForm: true });
        } else {
            this.cleanFields();
        }
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
            images: ['prueba1.png', 'prueba2.png'],
            type: (this.props.title === "PRODUCTO") ? 'products' : 'services'
        };
        this.productService.saveProduct(product).then(res => {
            this.setState({ message: res, hide: false });
        });
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
                                        <input id="name" type="text" className="form-control form-control-sm" readOnly={this.state.activeForm}/>
                                    </div>
                                    <div className="col-4" hidden={this.props.title !== 'PRODUCTO'}>
                                        <label htmlFor="name">Stock</label>
                                        <input id="stock" type="number" className="form-control form-control-sm" readOnly={this.state.activeForm}/>
                                    </div>
                                    <div className={this.props.title === 'PRODUCTO' ? "col-4" : "col"}>
                                        <label htmlFor="unitPrice">Precio</label>
                                        <input id="unitPrice" type="number" className="form-control form-control-sm" readOnly={this.state.activeForm}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mt-3 mx-3">
                                <label htmlFor="description">Descripción</label>
                                <textarea className="form-control" id="description" rows="3" readOnly={this.state.activeForm}></textarea>
                            </div>
                            <div className="form-group mt-3 mx-3">
                                <label>Imagenes</label>
                                <div className="form-group row mt-2 bg-light py-2 rounded mx-0">
                                    <div className="col-2">
                                        <img className="img-thumbnail border border-dark rounded float-start" src="https://papelesprimavera.vteximg.com.br/arquivos/ids/158720-1000-1000/cartulina-colores-pastel-primavera-1-.jpg?v=637323235041530000" alt="pic_1" />
                                    </div>
                                    <div className="col-2">
                                        <img className="img-thumbnail border border-dark rounded float-start" src="https://papelesprimavera.vteximg.com.br/arquivos/ids/158720-1000-1000/cartulina-colores-pastel-primavera-1-.jpg?v=637323235041530000" alt="pic_1" />
                                    </div>
                                    <div className="col-2">
                                        <img className="img-thumbnail border border-dark rounded float-start" src="https://papelesprimavera.vteximg.com.br/arquivos/ids/158720-1000-1000/cartulina-colores-pastel-primavera-1-.jpg?v=637323235041530000" alt="pic_1" />
                                    </div>
                                    <div className="col-2">
                                        <img className="img-thumbnail border border-dark rounded float-start" src="https://papelesprimavera.vteximg.com.br/arquivos/ids/158720-1000-1000/cartulina-colores-pastel-primavera-1-.jpg?v=637323235041530000" alt="pic_1" />
                                    </div>
                                    <div className="col-2">
                                        <img className="img-thumbnail border border-dark rounded float-start" src="https://papelesprimavera.vteximg.com.br/arquivos/ids/158720-1000-1000/cartulina-colores-pastel-primavera-1-.jpg?v=637323235041530000" alt="pic_1" />
                                    </div>
                                    <div className="col-2">
                                        <img className="img-thumbnail border border-dark rounded float-start" src="https://papelesprimavera.vteximg.com.br/arquivos/ids/158720-1000-1000/cartulina-colores-pastel-primavera-1-.jpg?v=637323235041530000" alt="pic_1" />
                                    </div>
                                </div>
                                <div className="form-group row mt-3 py-2">
                                    <div className="col">
                                        <input id="image" type="file" className="form-control-file" disabled={this.state.activeForm}/>
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