import axios from 'axios';

class FileServices {

    url = 'http://localhost:8090/file/';

    async saveFiles(productPics) {
        let response = '';
        const data = new FormData();
        for (let pic of productPics) {
            data.append('file', pic.file);
        }
        await axios.post(this.url + 'save', data).then(res => {
            response = res.data;
        });
        return response;
    }

    async getFiles(fileName) {
        let response = null;
        await axios.get(this.url + 'getFile/' + fileName, { responseType: "blob" }).then(res => {
            var blob = new Blob([res.data], { type: 'image/jpeg' });
            response = blob;
        });
        return response;
    }

}

export default FileServices;
