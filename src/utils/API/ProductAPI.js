import axios from 'axios';

const PRODUCT_URL = 'http://192.168.1.51:8080/api/v1/product/'

export function getProductDetails(name, success, error) {
  axios.get(PRODUCT_URL + 'details/name/' + name)
    .then(response => success(response))
    .catch(err => error(err));
}