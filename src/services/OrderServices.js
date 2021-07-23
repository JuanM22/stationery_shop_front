import axios from 'axios';

class OrderServices {

    url = 'http://localhost:8090/order/';

    async saveOrder(order) {
        let response = '';
        await axios.post(this.url + 'save', order).then(res => {
            response = res.data;
        });
        return response;
    }

    async viewOrder(orderId) {
        let product = null;
        await axios.get(this.url + 'view/' + orderId).then(res => {
            product = res.data;
        });
        return product;
    }

    async listOrders(customerId) {
        let data = [];
        await axios.get(this.url + 'list', { params: { customerId: customerId } }).then(res => {
            data = res.data;
        });
        return data;
    }
}

export default OrderServices;