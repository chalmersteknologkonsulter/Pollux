// @flow

const env = ((process.env: any): { [string]: string });
export default {
  NEW_YORK_TIMES_API_KEY: env.REACT_APP_NEW_YORK_TIMES_API_KEY
};
