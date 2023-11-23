import axios from 'axios';

const loginUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3001/login', userData);

    console.log('Server response:', response);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Login failed. Server responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error during login:', error);

    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response);
    }

    throw new Error('Error during login. Please try again.');
  }
};

export default loginUser;
