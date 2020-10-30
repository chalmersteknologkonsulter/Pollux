import { api } from '../helpers/apiHelper';
import { Endpoints } from '../utils/apiConst';

/*
Important!!
Will be refactored
*/

export function getCustomer() {
  return api.get('/customers').then((res) => res.data);
}

export function createCustomer(payload) {
  try {
    return api
      .post('/customers/', payload)
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}
export function updateCustomer(payload) {
  try {
    return api
      .put('/customers/', payload)
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export function deleteCustomer(customerId) {
  try {
    return api
      .delete('/customers/', {
        params: {
          customerId: customerId,
        },
      })
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}
