import axios from 'axios';

const API_URL = 'api/users';

const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData);

  if (response.data) {
    return response.data;
    // we can chose at this point on where to store the token or any other bit of data
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);
  if (response.data) {
    return response.data;
    // we can chose at this point on where to store the token or any other bit of data
  }
  return response.data;
};

const logout = async () => {
  //add functionality to remove the data from wherever it is stored
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
