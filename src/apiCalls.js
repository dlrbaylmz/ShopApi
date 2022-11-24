import axios from 'axios';
import Config from 'react-native-config';

export const getProductDetails = id => {
  return axios.get(`${Config.API_URL}/${id}`); //verileri çağırma
};

export const getProducts = () => {
  return axios.get(Config.API_URL);
};
