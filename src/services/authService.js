import api from './api';

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { accessToken, roles, username, user_id} = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('roles', JSON.stringify(roles));
      localStorage.setItem('username', username);
      localStorage.setItem('user_id',user_id);
      return { accessToken, roles, username };
    } catch (error) {
      throw error;
    }
  },


  otpAuthentication: async (email, username) => {
    try {
      const response = await api.post('/auth/sendOtpEmailRegister', { email, username });
      const message = response.data;
      return message;
    } catch (error) {
      throw error;
    }
  },

  register: async (formData) => {
    try {
      const response = await api.post('/auth/register', formData);
      const message = response.data;
      return message;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    return new Promise((resolve, reject) => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);

        if (!accessToken) {
          reject("No access token found.");
          return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8081/api/logout', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('roles');
              localStorage.removeItem('username');
              resolve(xhr.responseText);
            }else if (xhr.status === 401) {
                // Unauthorized status received, clear the access token but don't consider it a failure.
                localStorage.removeItem('accessToken');
                localStorage.removeItem('roles');
                localStorage.removeItem('username');
                resolve("Logged out due to token expiration.");
              } else {
                // Other error status received.
                reject("Logout failed with status: " + xhr.status);
              }
          }
        };

        xhr.send();
      } catch (error) {
        reject(error);
      }
    });
  },



  isLoggedIn: () => {
    return !!localStorage.getItem('accessToken');
  },

  getUserInfo: () => {
    const accessToken = localStorage.getItem('accessToken');
    const rolesJSON = localStorage.getItem('roles');
    let roles = [];
    if (rolesJSON) {
      roles = JSON.parse(rolesJSON);
    }
    const username = localStorage.getItem('username');
    return { accessToken, roles, username };
  },
};

export default authService;
