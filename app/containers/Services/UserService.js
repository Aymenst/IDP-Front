import axios from 'axios';
import { API } from '../../config/apiUrl';

class UserService {
    getUsers = () => axios.get(`${API}/users`);
    updateUser= (user) => axios.put(`${API}/users/${user.id}`, user);
    inviteUser= (user) => axios.post(`${API}/users`, user);
    deleteUser= (Id) => axios.post(`${API}/users/delete/${Id}`, Id);
}
export default new UserService();