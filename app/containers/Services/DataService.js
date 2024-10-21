import axios from 'axios';
import { API } from '../../config/apiUrl';

class DataService {
    getRequest = () => axios.get(`${API}/Csv/fetch-fcsv`);

    getData = () => axios.get(`${API}/data/all`);

    getPdf = (id1, id2) => axios.post(`${API}/data/getPdf/${id1}/${id2}`);

    sendEmail = (id1, email) => axios.post(`${API}/data/sendEmail/${id1}/${email}`);

    getLastRegister = () => axios.get(`${API}/data/last`);

    getHistoricData = DataHistoryRequest => axios.post(`${API}/data/historic`, DataHistoryRequest);

    saveRequest = Request => axios.post(`${API}/data/add`, Request);

    updateRequest = Request => axios.post(`${API}/data/update`, Request);

    deleteRequest = id => axios.post(`${API}/data/delete/${id}`);

    getLicence = id => axios.get(`${API}/data/getFile/${id}`);
}
export default new DataService();
