import axios from 'axios';
import { API } from '../../config/apiUrl';

class ProfileService {

    getRequest = () => axios.get(`${API}/profile/all`);

    saveRequest = (formData) => axios.post(`${API}/profile/add`, formData, {
                                                                      headers: {
                                                                        'Content-Type': 'multipart/form-data',
                                                                      }});

    saveRequest = (formData) => axios.post(`${API}/profile/add`, formData, {
                                                                      headers: {
                                                                        'Content-Type': 'multipart/form-data',
                                                                      }});

    updateRequest = (formData) => axios.post(`${API}/profile/update`, formData, {
                                                                      headers: {
                                                                        'Content-Type': 'multipart/form-data',
                                                                      }});

    deleteRequest = Id => axios.post(`${API}/profile/delete/${Id}`);
}
export default new ProfileService();
