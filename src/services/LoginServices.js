import axios from 'axios';

class LoginServices {

    url = 'http://localhost:8090/';

    async saveLogin(login) {
        let response = '';
        await axios.post(this.url + 'login/save', login, { withCredentials: true }).then(res => {
            response = res.data;
        });
        return response;
    }

    async checkLogin(login) {
        let response = null;
        await axios.post(this.url + 'login', login, { withCredentials: true }).then(res => {
            response = res.data;
        });
        return response;
    }

    async userIsLoggedIn() {
        let response = null;
        await axios.get(this.url + 'check', { withCredentials: true }).then(res => {
            response = res.data;
        });
        return response;
    }

    async logOut() {
        let response = null;
        await axios.get(this.url + 'logout', { withCredentials: true }).then(res => {
            response = res.data;
        });
        return response;
    }

    async getUserId() {
        let response = null;
        await axios.get(this.url + 'userId', { withCredentials: true }).then(res => {
            response = res.data;
        });
        return response;
    }

}

export default LoginServices;