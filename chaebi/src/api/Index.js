import axios from 'axios';
import config from 'config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = async () =>{
  const token = await AsyncStorage.getItem('userToken')
  return axios.create({
    baseURL: config.API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : token,
    },
  }); 
} 

const userApi = async () => {
  return axios.create({
    baseURL: config.API_URL,
    timeout: 3000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  
}

export { api, userApi };