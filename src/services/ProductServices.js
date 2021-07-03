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

    async viewProduct(productId) {
        let product = null;
        await axios.get(this.url + 'view/' + productId).then(res => {
            product = res.data;
        });
        return product;
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
