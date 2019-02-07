import axios from 'axios';
import config from './config';

class Auth {
  /*
   * Sends a request to the server to login
   * the user. Returns a promise
   */
  loginRequest = (cpf, password) => {
    const url = config.loginUrl;
    return axios.post(url, {
      cpf,
      password,
    });
  };

  /*
   * Retrieve the user token from storage
   */
  getToken = async () => {
    try {
    } catch (error) {
      throw error;
    }
  };

  /*
   * Save the user token on local storage
   */
  login = async (token, apolloClient) => {
    try {
      if (apolloClient) {
        await apolloClient.resetStore();
      }
    } catch (error) {
      throw error;
    }
  };

  /*
   * Verify if the user token is still valid
   */
  tokenIsValid = async token => {
    if (!token) return false;
    const url = config.loginUrl + '/auth/jwt';
    return await axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: 'bearer ' + token,
          },
        }
      )
      .then(res => res.status === 200 && res.data.success)
      .catch(() => false);
  };

  /*
   * Remove the user token from storage
   */
  logout = async apolloClient => {
    try {
      if (apolloClient) {
        await apolloClient.resetStore();
      }
    } catch (error) {
      throw error;
    }
  };
}

export default new Auth();
