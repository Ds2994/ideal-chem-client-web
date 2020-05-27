import axios from 'axios';

const GET_CUSTOMER = 'http://192.168.1.51:8080/api/v1/customer/'

export function getCustomers(name, success, error) {
  axios.get(GET_CUSTOMER + 'name/' + name)
    .then(response => success(response))
    .catch(err => error(err));
}

export function postCustomer(data, success, error) {
  axios.post(GET_CUSTOMER , data, {
    headers: {
      'Content-Type': 'application/json'
    }})
    .then(response => success(response))
    .catch(err => error(err));
}