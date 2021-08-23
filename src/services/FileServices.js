import axios from 'axios';
import { config } from '../serverConfig';

class FileServices {

    url = config.host + 'file/';

    async saveFiles(files) {
        let response = '';
        const data = new FormData();
        if (files[0] !== undefined) for (let pic of files) data.append('file', pic.file);
        else data.append('file', files);
        await axios.post(this.url + 'save', data, { withCredentials: true }).then(res => {
            response = res.data;
        });
        return response;
    }

    async getFiles(fileName) {
        let response = null;
        await axios.get(this.url + 'getFile/' + fileName, { responseType: "blob", withCredentials: true}).then(res => {
            var blob = new Blob([res.data], { type: 'image/jpeg' });
            response = blob;
        });
        return response;
    }

}

export default FileServices;
