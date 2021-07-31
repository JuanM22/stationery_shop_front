import axios from 'axios';

class ProductServices {

    url = 'http://localhost:8090/product/';

    async saveProduct(product) {
        let response = '';
        await axios.post(this.url + 'save', product, { withCredentials: true }).then(res => {
            response = res.data;
        });
        return response;
    }

    async viewProduct(productId) {
        let product = null;
        await axios.get(this.url + 'view/' + productId, { withCredentials: true }).then(res => {
            product = res.data;
        });
        return product;
    }

    async listProducts(productType) {
        let data = [];
        await axios.get(this.url + 'list', { params: { productType: productType } , withCredentials: true} ).then(res => {
            data = res.data;
        });
        return data;
    }
}

export default ProductServices;
