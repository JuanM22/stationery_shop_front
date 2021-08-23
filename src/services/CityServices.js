import axios from 'axios';
import { config } from '../serverConfig';

class CityServices {

    url = config.host + 'city/';

    async listCities() {
        let data = [];
        await axios.get(this.url + 'list', { withCredentials: true }).then(res => {
            data = res.data;
        });
        return data;
    }
}

export default CityServices;