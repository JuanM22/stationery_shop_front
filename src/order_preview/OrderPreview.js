import React from 'react';

/* Services */
import './OrderPreview.css';
import dollar_sign from './dollar_sign.png';
import FileServices from '../services/FileServices';
import OrderServices from '../services/OrderServices';
import LoginService from '../services/LoginServices';
import UserService from '../services/UserServices';
/* -------------------------------------------------- */

/* Other components */
import SuccessMessage from '../custom_messages/success_message_compo/SuccessMessage';
/* -------------------------------------------------- */

class OrderPreview extends React.Component {

    constructor(props) {
        super(props);
        const data = this.props.chargeOrderInfo();
        this.state = {
            orderId: 0,
            productList: data[0],
            serviceList: data[1],
            dollarSignClass: "dollarMouseOut",
            paymentPanelClass: "panelHidden",
            orderTotalPrice: 0,
            productPics: [],
            servicePics: [],
            deliveryDate: "",
            dispatchDate: "",
            user: {
                name: '',
                email: '',
                phone: '',
                city: {
                    name: ''
                },
                address: ''
            },
            hide: true,
            message: ''
        }
        this.fileService = new FileServices();
        this.orderService = new OrderServices();
        this.loginService = new LoginService();
        this.userService = new UserService();
    }

    componentDidMount() {
        this.setUserInfo();
        this.chargeProductPics(this.state.productList, "products");
        this.chargeProductPics(this.state.serviceList, "services");
        this.setDates();
        this.calculateTotalPrice();
    }

    chargeProductPics(itemList, type) {
        let pics = (type === "products") ? this.state.productPics : this.state.servicePics;
        for (let detail of itemList) {
            let images = detail.item.images;
            this.fileService.getFiles(images[0]).then(res => {
                var file = new File([res], images[0], { type: res.type });
                var src = URL.createObjectURL(file);
                const info = {
                    src: src
                }
                pics.push(info);
                if (type === "products") this.setState({ productPics: pics });
                else this.setState({ servicePics: pics });
            });
        }
    }

    calculateTotalPrice() {
        var totalPrice = 0;
        for (var orderDetail of this.state.productList) {
            totalPrice += orderDetail.item.unitPrice * orderDetail.quantity;
        }
        for (orderDetail of this.state.serviceList) {
            totalPrice += orderDetail.item.unitPrice * orderDetail.quantity;
        }
        this.setState({ orderTotalPrice: totalPrice });
    }

    changeDetailQuantity(detail, e) {
        const newQuantity = e.target.value;
        detail.quantity = newQuantity;
        const productList = this.state.productList;
        const index = productList.indexOf(detail);
        productList[index] = detail;
        this.setState({ productList: productList });
    }

    changeDollarClass = () => {
        var imageCssClass = this.state.dollarSignClass;
        imageCssClass = (imageCssClass === "") ? "dollarMouseOut" : "";
        this.setState({ dollarSignClass: imageCssClass });
    }

    changePaymentPanelClass = () => {
        var panelClass = this.state.paymentPanelClass;
        panelClass = (panelClass === "panelHidden") ? "showPanel" : "panelHidden";
        this.setState({ paymentPanelClass: panelClass });
    }

    saveOrder = (e) => {
        e.preventDefault();
        const order = {
            orderId: this.state.orderId,
            user: this.state.user,
            state: true,
            dispatchDate: this.state.dispatchDate,
            deliveryDate: this.state.deliveryDate,
            totalPrice: parseFloat(document.getElementById('totalPrice').innerHTML),
            products: this.state.productList,
            services: this.state.serviceList
        }
        this.orderService.saveOrder(order).then(res => {
            this.setState({ hide: false, message: res });
            sessionStorage.clear();
            this.props.sessionStorageCleared();
        });
    }

    setNewInputValue(detail, e, feature) {
        const newValue = e.target.value;
        detail.features[feature.name] = newValue;
    }

    createInputField(data) {
        const feature = data.feature;
        const inputClass = (feature.type === "file") ? "form-control-file" : "form-control form-control-sm"
        return (
            <div className="col" key={feature.name}>
                <label htmlFor={feature.name} className="mx-2">{feature.name}</label>
                <input type={feature.type} className={inputClass} id={feature.name} value={data.value} onChange={(e) => this.setNewInputValue(data.detail, e, feature)}></input>
            </div>
        )
    }

    createComboBoxField(data) {
        const feature = data.feature;
        return (
            <div className="col" key={feature.name}>
                <label htmlFor={feature.name}>{feature.name}</label>
                <select className="form-control form-control-sm" id={feature.name} value={data.value} onChange={(e) => this.setNewInputValue(data.detail, e, feature)}>
                    {feature.values.map((item, index) => {
                        return (<option value={item} key={index}>{item}</option>)
                    })}
                </select>
            </div>
        )
    }

    setDates = () => {
        var today = new Date()
        var dispatchDate = today.toLocaleDateString('en-CA');
        today.setDate(today.getDate() + 3);
        var deliveryDate = today.toLocaleDateString('en-CA');
        this.setState({ dispatchDate: dispatchDate, deliveryDate: deliveryDate });
    }

    setUserInfo = () => {
        this.loginService.getUserId().then(res => {
            if (res > 0) {
                this.userService.viewUser(res).then(res => {
                    this.setState({ user: res });
                });
            }
        })
    }

    render() {

        const orderPricePanel =
            <div className="form-group row">
                <div className="col-2 px-0">
                    <img className={this.state.dollarSignClass} src={dollar_sign} alt="dollar_sign_pic" id="dollarSignPic" title="Pagar ahora" onMouseEnter={this.changeDollarClass} onMouseLeave={this.changeDollarClass} onClick={this.changePaymentPanelClass} />
                </div>
                <div className="card px-0 col mx-1">
                    <div className="card-header bg-success text-white fw-bold">Valor total</div>
                    <div className="card-body">
                        $<label id="totalPrice">{this.state.orderTotalPrice}</label>
                        <button className="btn btn-success mx-3" data-bs-toggle="modal" data-bs-target="#myModal" type="submit">Pagar ahora</button>
                    </div>
                </div>
            </div>

        let orderProductsData = this.state.productList.map((detail, index) => {
            const customFields = detail.item.featureList.map((feature, index) => {
                const data = {
                    feature: feature,
                    currentValue: detail.features[feature.name],
                    detail: detail
                }
                return (feature.type === 'select') ? this.createComboBoxField(data) : this.createInputField(data);
            });

            return (
                <div className="card" key={detail.item.productId}>
                    <h4 className="card-header bg-primary text-white">{detail.item.name}</h4>
                    <div className="form-group row mt-3">
                        <div className="col-2 pb-3">
                            <img className="mx-3 img-thumbnail border border-dark rounded" src={(this.state.productPics[index] !== undefined) ? this.state.productPics[index].src : null} alt="Product pic" />
                        </div>
                        <div className="col">
                            <div className="form-group row mx-2">
                                <div className="col">
                                    <div className="mb-2">
                                        <label htmlFor={`${"quantity" + detail.item.productId}`}>Cantidad</label>
                                        <input id={`${"quantity" + detail.item.productId}`} type="number" value={detail.quantity} min="1"
                                            className="form-control form-control-sm" onChange={(e) => this.changeDetailQuantity(detail, e)} />
                                    </div>
                                    <div>
                                        <label htmlFor={`${"price" + detail.item.productId}`}>Valor</label>
                                        <input id={`${"price" + detail.item.productId}`} value={detail.quantity * detail.item.unitPrice}
                                            className="form-control form-control-sm" readOnly />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="card-header bg-primary bg-gradient text-white fw-bold">Especificaciones adicionales</div>
                                        {(detail.item.featureList.length > 0) ?
                                            <div className="card-body" id="customFieldsContainer">
                                                {customFields}
                                            </div>
                                            : <div className="bg-warning py-2 text-center fw-bold">Este producto no cuenta con especificación adicionales</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* <div className="form-group row mx-2 mt-2">

                            </div> */}
                        </div>
                    </div>
                </div>
            );
        });

        let orderServicesData = this.state.serviceList.map((detail, index) => {
            return (
                <div className="card" key={detail.item.productId}>
                    <h4 className="card-header bg-primary text-white">{detail.item.name}</h4>
                    <div className="form-group row mt-3">
                        <div className="col-2 pb-3">
                            <img className="mx-3 img-thumbnail border border-dark rounded float-start" src={(this.state.servicePics[index] !== undefined) ? this.state.servicePics[index].src : null} alt="Product pic" />
                        </div>
                        <div className="col">
                            <div className="form-group row mx-2">
                                <div className="col">
                                    <label htmlFor={`${"quantity" + detail.item.productId}`}>Cantidad</label>
                                    <input id={`${"quantity" + detail.item.productId}`} type="number" value={detail.quantity} min="1"
                                        className="form-control form-control-sm" onChange={(e) => this.changeDetailQuantity(detail, e)} />
                                </div>
                                <div className="col">
                                    <label htmlFor={`${"quantity" + detail.item.productId}`}>Color</label>
                                    <input id={`${"quantity" + detail.item.productId}`} value={detail.styleSelected} readOnly
                                        className="form-control form-control-sm" />
                                </div>
                            </div>
                            <div className="form-group row mx-2 mt-2">
                                <div className="col-6">
                                    <label htmlFor={`${"price" + detail.item.productId}`}>Valor</label>
                                    <input id={`${"price" + detail.item.productId}`} value={detail.quantity * detail.item.unitPrice}
                                        className="form-control form-control-sm" readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="container-fluid h-100" id="orderPreview">
                <div className="text-center" hidden={this.state.hide}>
                    <SuccessMessage message={this.state.message} />
                </div>
                <form onSubmit={this.saveOrder}>
                    <div className="card bg-dark bg-gradient">
                        <div className="card-header bg-success bg-gradient text-white">
                            <h1>Tu pedido</h1>
                        </div>
                        <div className="container-fluid my-2 py-4">
                            <div className="d-flex align-items-start">
                                <div className="nav flex-column nav-pills rounded" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button className="nav-link text-white border border-primary active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-basic-info" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Información Básica</button>
                                    <button className="nav-link text-white border border-primary" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-products" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Productos</button>
                                    <button className="nav-link text-white border border-primary" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-services" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Servicios</button>
                                </div>
                                <div className="tab-content container-fluid" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-basic-info" role="tabpanel" aria-labelledby="v-pills-basic-info-tab">
                                        <div className="card">
                                            <div className="card-header bg-dark text-white">
                                                <h3>Información del cliente</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <label>Nombre</label>
                                                        <input type="text" readOnly className="form-control form-control-sm" value={this.state.user.name}></input>
                                                    </div>
                                                    <div className="col-4">
                                                        <label>Correo Electrónico</label>
                                                        <input type="text" readOnly className="form-control form-control-sm" value={this.state.user.email}></input>
                                                    </div>
                                                    <div className="col-4">
                                                        <label>Teléfono</label>
                                                        <input type="text" readOnly className="form-control form-control-sm" value={this.state.user.phone}></input>
                                                    </div>
                                                </div>
                                                <div className="row my-2">
                                                    <div className="col-4">
                                                        <label>Dirección</label>
                                                        <input type="text" readOnly className="form-control form-control-sm" value={this.state.user.address}></input>
                                                    </div>
                                                    <div className="col-4">
                                                        <label>Ciudad</label>
                                                        <input type="text" readOnly className="form-control form-control-sm" value={this.state.user.city?.name}></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card my-2 mt-4">
                                            <div className="card-header bg-dark text-white">
                                                <h3>Información Básica del Pedido</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <label>Fecha de Expedición</label>
                                                        <input type="date" readOnly className="form-control form-control-sm" id="dispatchDate" value={this.state.dispatchDate}></input>
                                                    </div>
                                                    <div className="col-4">
                                                        <label>Fecha Aproximada de Entrega</label>
                                                        <input type="date" readOnly className="form-control form-control-sm" id="deliveryDate" value={this.state.deliveryDate}></input>
                                                    </div>
                                                    <div className="col-4">
                                                        <label>Valor a Pagar</label>
                                                        <input type="text" readOnly className="form-control form-control-sm" value={`$${this.state.orderTotalPrice}`}></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="v-pills-products" role="tabpanel" aria-labelledby="v-pills-products-tab">
                                        <div className="card">
                                            <div className="card-header bg-dark text-white">
                                                <h3>Productos seleccionados</h3>
                                            </div>
                                            <div className="card-body">
                                                {orderProductsData}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="v-pills-services" role="tabpanel" aria-labelledby="v-pills-services-tab">
                                        <div className="card">
                                            <div className="card-header bg-dark text-white">
                                                <h3>Servicios seleccionados</h3>
                                            </div>
                                            <div className="card-body">
                                                {orderServicesData}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`container col-4 ${this.state.paymentPanelClass}`} id="orderPricePanel">
                        {orderPricePanel}
                    </div>
                </form>
            </div >
        );
    }

}

export default OrderPreview;