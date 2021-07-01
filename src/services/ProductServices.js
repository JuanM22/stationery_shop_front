import axios from 'axios';

class ProductServices {

    url = 'http://localhost:8090/product/list';

    async listProducts() {
        let data = [];
        await axios.get(this.url).then(res => {
            data = res.data;
        });
        return data ;
    }
}

export default ProductServices;
