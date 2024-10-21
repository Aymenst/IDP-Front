import axios from 'axios';
import { API } from '../../config/apiUrl';

class InternalCompaniesService {
    getSuppliers = () => axios.get(`${API}/group-companies`);
    saveInternalCompany = (payload) => axios.post(`${API}/group-companies`, payload);
    updateInternalCompany = GroupCompanyDto => axios.post(`${API}/group-companies/update`, GroupCompanyDto);
    deleteInternalCompanies = (payload) => axios.request({method: "delete", data: payload, url: `${API}/group-companies`});
    deleteInternalCompany= (Id) => axios.post(`${API}/group-companies/delete/${Id}`, Id);
}
export default new InternalCompaniesService();