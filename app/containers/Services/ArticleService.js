import axios from 'axios';
import { API } from '../../config/apiUrl';

class ArticleService {
    getRequest = () => axios.get(`${API}/article/all`);

    getRequestById = Id => axios.post(`${API}/article/row/${Id}`);

    saveRequest = Request => axios.post(`${API}/article/add`, Request);

    updateRequest = Request => axios.post(`${API}/article/update`, Request);

    deleteRequest = Id => axios.post(`${API}/article/delete/${Id}`);
}
export default new ArticleService();
