import React from 'react';
import { Link } from 'react-router-dom';

import './OrderList.css';

import FilterComponent from '../../filter_compo/FilterComponent';
import OrderServices from '../../services/OrderServices';
import LoginServices from '../../services/LoginServices';

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderId: 0,
            orders: []
        }
        this.loginService = new LoginServices();
        this.orderService = new OrderServices();
    }

    componentDidMount() {
        this.listOrders();
    }

    listOrders = () => {
        this.loginService.getUserId().then(res => {
            let userId;
            if (this.props.userType === 'administrator') userId = 0;
            else userId = res;
            this.orderService.listOrders(userId).then(res => this.setState({ orders: res }));
        });
    }

    updateOrder = () => {
        const order = this.state.orders.find(order => order.orderId = this.state.orderId);
        order.state = false;
        this.orderService.saveOrder(order).then(res => {
            setTimeout(() => {
                alert(res);
            }, 200);
            this.setState({ orderId: 0 }, this.listOrders());
        });
    }

    setOrderId(orderId) {
        this.setState({ orderId: orderId });
    }

    render() {

        const ordersData = this.state.orders.map((order, index) => {
            return (
                <div className="card py-2 top-bar-bg bg-gradient text-white mb-2 border-light" key={index}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                                <div className="align-self-center mt-2"><strong>Código de pedido:</strong> {order.orderId}</div>
                                <hr className="dropdown-divider"></hr>
                                <Link className="btn btn-primary" to={`/order/view/${order.orderId}`}>VER</Link>
                                <button type="button" className="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => this.setOrderId(order.orderId)}>CANCELAR</button>
                            </div>
                            <div className="col-7">
                                <div className="row">
                                    <div className="card px-0">
                                        <div className="card-header fw-bold bg-dark bg-gradient">Detalles</div>
                                        <div className="card-body bordered  bg-dark bg-gradient">
                                            <div className="row">
                                                <div className="col">
                                                    <label><strong>Fecha de expedición </strong><br></br>{order.dispatchDate}</label>
                                                </div>
                                                <div className="col">
                                                    <label><strong>Fecha de entrega </strong><br></br>{order.deliveryDate}</label>
                                                </div>
                                                <div className="col">
                                                    <label><strong>Valor Total </strong><br></br>${order.totalPrice}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div id="ordersContainer" className="container-fluid">
                <div className="row">
                    <div className="col-10">
                        <div className="card border-light border-2">
                            <div className="card-header fw-bold top-bar-bg bg-gradient text-white py-3"><h2>PEDIDOS</h2></div>
                            <div className="card-body form-bg">
                                {ordersData}
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <FilterComponent />
                    </div>
                </div>
                {/* Edit Modal */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <input hidden defaultValue="0" type="number" id="orderId" />
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Eliminar Pedido</h5>
                            </div>
                            <div className="modal-body">
                                El pedido se eliminará del sistema. ¿Está seguro de que desea cancelarlo?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.updateOrder} data-bs-dismiss="modal">Sí, eliminar pedido</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ---------------------------------- */}
            </div>
        )
    }

}


export default OrderList;