import axios from 'axios';

class LoginServices {

    url = 'http://localhost:8090/login/';

    async saveLogin(login) {
        let response = '';
        await axios.post(this.url + 'save', login).then(res => {
            response = res.data;
        });
        return response;
    }

    async checkLogin(login) {
        let response = null;
        await axios.get(this.url + 'check', { params: { login: login } }).then(res => {
            response = res.data;
        });
        return response;
    }

}

export default LoginServices;