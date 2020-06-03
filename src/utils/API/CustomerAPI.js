import axios from 'axios';

const CUSTOMER_URL = 'http://192.168.1.51:8080/api/v1/customer/'

export function getCustomers(name, success, error) {
  axios.get(CUSTOMER_URL + 'name/' + name)
    .then(response => success(response))
    .catch(err => error(err));
}

export function postCustomer(data, success, error) {
  axios.post(CUSTOMER_URL , data, {
    headers: {
      'Content-Type': 'application/json'
    }})
    .then(response => success(response))
    .catch(err => error(err));
}