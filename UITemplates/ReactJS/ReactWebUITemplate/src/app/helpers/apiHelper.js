// // @flow

// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Endpoints } from '../utils/apiConst';
// import Cookie from 'js-cookie';
// export type Token = {
//   token: string,
// };
// /** Setup an Axios instance */
// export const api = axios.create({
//   baseURL: Endpoints.API_BASE_URL,
//   timeout: 1000,
// });

// api.interceptors.request.use(function (config) {
//   // config.headers.Authorization = `Bearer ${token}`;
//   const token = Cookie.get('auth-token');
//   config.headers.Authorization = token;
//   return config;
// });

// api.interceptors.response.use(null, (ex) => {
//   let errrorMessage = 'Oops, something is wrong! Try again.';
//   if (ex.response) {
//     const errorData = ex.response.data;
//     if (errorData.errors && errorData.errors.length) {
//       // Only show first error from the list of errors
//       errrorMessage = errorData.errors[0];
//     } else if (errorData.fault) {
//       errrorMessage = errorData.fault.faultstring;
//     }
//   } else {
//     toast.error(errrorMessage);
//   }

//   return Promise.reject(ex);
// });
