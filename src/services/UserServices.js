import axios from 'axios';

class UserServices {

    url = 'http://localhost:8090/user/';

    async saveUser(user) {
        let response = '';
        await axios.post(this.url + 'save', user).then(res => {
            response = res.data;
        });
        return response;
    }

    async viewUser(userId) {
        let product = null;
        await axios.get(this.url + 'view/' + userId).then(res => {
            product = res.data;
        });
        return product;
    }

    async listUsers(userId) {
        let data = [];
        await axios.get(this.url + 'list', { params: { userId: userId } }).then(res => {
            data = res.data;
        });
        return data;
    }
}

export default UserServices;