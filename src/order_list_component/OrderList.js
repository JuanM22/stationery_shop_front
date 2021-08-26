import React from 'react';
import { Link } from 'react-router-dom';

import './OrderList.css';

import FilterComponent from '../filter_compo/FilterComponent';
import OrderServices from '../services/OrderServices';
import LoginServices from '../services/LoginServices';

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            if (res > 0) this.orderService.listOrders(res).then(res => this.setState({ orders: res }));
        })
    }

    render() {

        const ordersData = this.state.orders.map((order, index) => {
            return (
                <div className="card py-2 bg-primary bg-gradient text-white mb-2 border-light" key={index}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                                <div className="align-self-center mt-2"><strong>Código de pedido:</strong> {order.orderId}</div>
                                <hr className="dropdown-divider"></hr>
                                <Link className="btn btn-success" to={`/order/view/${order.orderId}`}>EDITAR</Link>
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
                            <div className="card-header fw-bold bg-success bg-gradient text-white py-3"><h2>PEDIDOS</h2></div>
                            <div className="card-body bg-dark bg-gradient">
                                {ordersData}
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <FilterComponent />
                    </div>
                </div>
            </div>
        )
    }

}


export default OrderList;