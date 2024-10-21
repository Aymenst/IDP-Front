import axios from 'axios';
import { API } from '../../config/apiUrl';

class AuthService {
    login = (credentials) => axios.post(`${API}/auth/login`, credentials);

}
export default new AuthService();