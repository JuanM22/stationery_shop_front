import User from '../userComponents/User';

class Order {

    orderId = Number;
    user = new User();
    state = Boolean;
    dispatchDate = String;
    deliveryDate = String;
    totalPrice = Number;
    products = [];
    services = []

}

export default Order;   