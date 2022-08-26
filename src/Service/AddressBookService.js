import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8087/addressBook";

class AddressBookService {
  getAllAddressBookData() {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/get`);
  }

  addAddressBook(data) {
    return axios.post(`${EMPLOYEE_API_BASE_URL}/add`, data);
  }

  updateAddressBook(id, data) {
    return axios.put(`${EMPLOYEE_API_BASE_URL}/update/${id}`, data);
  }

  deleteAddressBook(id) {
    return axios.delete(`${EMPLOYEE_API_BASE_URL}/delete/${id}`);
  }

  getAddressBookById(id) {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/getById/${id}`);
  }

  getAddressBookByCity(city) {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/getByCity/${city}`);
  }

  getAddressBookByState(state) {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/getByState/${state}`);
  }

  sortAddressBookByCity() {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/sortByCity`);
  }

  sortAddressBookByState() {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/sortByState`);
  }

  signUp(data) {
    return axios.post(`${EMPLOYEE_API_BASE_URL}/signUp`, data);
  }
  signIn(data) {
    return axios.post(`${EMPLOYEE_API_BASE_URL}/signIn`, data);
  }
  forgotPassword() {
    return axios.post(`${EMPLOYEE_API_BASE_URL}/forgotPassword`);
  }
  getAll() {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/getAll`);
  }
  getLoginById(id) {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/getLoginById/${id}`);
  }
}

export default new AddressBookService();
