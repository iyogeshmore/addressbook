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
}

export default new AddressBookService();