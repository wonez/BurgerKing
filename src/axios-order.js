import axios from 'axios';

const axiosOrder = axios.create({
    baseURL: 'https://react-my-burger-a0f13.firebaseio.com/'
});

export default axiosOrder;