import axios from 'axios';

const INVOICE_URL = 'http://192.168.1.51:8080/api/v1/invoice'

export function getLatestInvoices(success, error) {
  axios.get(INVOICE_URL + '/')
    .then(response => success(response))
    .catch(err => error(err));
};

export function getLatestInvoicesByDate(startDate, endDate, success, error) {
  axios.get(INVOICE_URL + '/', {
    params : {
      startDate: startDate,
      endDate: endDate
    }
  })
    .then(response => success(response))
    .catch(err => error(err));
}