import { api } from '../helpers/apiHelper';
import { Endpoints } from '../utils/apiConst';

/*
Important!!
Will be refactored
*/

export function getSeller() {
  return api.get('/sellers').then((res) => res.data);
}

export function createSeller(payload) {
  try {
    return api
      .post('/sellers/', payload)
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}
export function updateSeller(payload) {
  try {
    return api
      .put('/sellers/', payload)
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export function deleteSeller(sellerId) {
  try {
    return api
      .delete('/sellers/', {
        params: {
          sellerId: sellerId,
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
