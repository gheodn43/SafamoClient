import api from './api';

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { accessToken, roles, username } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('roles', JSON.stringify(roles));
      localStorage.setItem('username', username);

      return { accessToken, roles, username };
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('username');
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
