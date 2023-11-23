import axios from 'axios';

const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3001/register', userData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Registration failed. Server responded with an error.');
    }
  } catch (error) {
    throw new Error('Error during registration. Please try again.');
  }
};

export default registerUser;
