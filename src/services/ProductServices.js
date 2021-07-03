import axios from 'axios';

class ProductServices {

    url = 'http://localhost:8090/product/';

    async saveProduct(product) {
        let response = '';
        await axios.post(this.url + 'save', product).then(res => {
            response = res.data;
        });
        return response;
    }

    async listProducts() {
        let data = [];
        await axios.get(this.url + 'list').then(res => {
            data = res.data;
        });
        return data;
    }
}

export default ProductServices;
