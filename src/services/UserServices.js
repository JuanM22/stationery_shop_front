import axios from 'axios';

class UserServices {

    url = 'http://localhost:8090/user/';

    async saveUser(user) {
        let response = '';
        await axios.post((user.userId > 0) ? this.url + 'save' : this.url + 'register', user, { withCredentials: true }).then(res => {
            response = res.data;
        });
        return response;
    }

    async viewUser(userId) {
        let product = null;
        await axios.get(this.url + 'view/' + userId, { withCredentials: true }).then(res => {
            product = res.data;
        });
        return product;
    }

    async listUsers(userId) {
        let data = [];
        await axios.get(this.url + 'list', { params: { userId: userId } , withCredentials: true}).then(res => {
            data = res.data;
        });
        return data;
    }
}

export default UserServices;