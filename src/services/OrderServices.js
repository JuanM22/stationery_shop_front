import axios from 'axios';
import { config } from '../serverConfig';

class OrderServices {

    url = config.host + 'order/';

    async saveOrder(order) {
        let response = '';
        await axios.post(this.url + 'save', order, { withCredentials: true }).then(res => {
            response = res.data;
        });
        return response;
    }

    async viewOrder(orderId) {
        let product = null;
        await axios.get(this.url + 'view/' + orderId, { withCredentials: true }).then(res => {
            product = res.data;
        });
        return product;
    }

    async listOrders(userId) {
        let data = [];
        await axios.get(this.url + 'list', { params: { userId: userId }, withCredentials: true }).then(res => {
            data = res.data;
        });
        return data;
    }
}

export default OrderServices;