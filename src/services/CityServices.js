import axios from 'axios';

class CityServices {

    url = 'http://localhost:8090/city/';

    async listCities() {
        let data = [];
        await axios.get(this.url + 'list').then(res => {
            data = res.data;
        });
        return data;
    }
}

export default CityServices;