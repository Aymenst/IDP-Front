import axios from 'axios';
import {API} from '../../config/apiUrl';
import {API_URL} from "../../redux/constants/api";

class TaskService {
    getTasks = (type) => axios.get(`${API}/tasks`, {
        params: {
            type: type
        }
    });
    getTasksByUser = (type, userId) => axios.get(`${API}/tasks/users/${userId}`, {
        params: {
            type: type
        }
    });


    updateTask = (id, payload) => {
        const data = new FormData();
        data.append('comment', payload.comment);
        for (let i = 0; i < payload.files.length; i++) {
            data.append('files', payload.files[i]);
        }
        return axios.request({
            method: 'post',
            url: `${API}/tasks/${id}`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data
        });
    }
}

export default new TaskService();
