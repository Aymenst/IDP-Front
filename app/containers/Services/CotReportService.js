import axios from 'axios';
import { API } from '../../config/apiUrl';

class CotReportService {
    getRequest = () => axios.get(`${API}/cotReport/all`);

    getRequestById = Id => axios.post(`${API}/cotReport/row/${Id}`);

    saveRequest = Request => axios.post(`${API}/cotReport/add`, Request);

    updateRequest = Request => axios.post(`${API}/cotReport/update`, Request);

    deleteRequest = Id => axios.post(`${API}/cotReport/delete/${Id}`);
}
export default new CotReportService();
