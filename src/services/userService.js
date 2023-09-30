// Services/userService.js
import axios from 'axios';

const userService = {
  // Gọi API để lấy thông tin người dùng
  getUserInfo: async () => {
    try {
      const response = await axios.get('/user-profile/id=?'); // Thay đổi URL của API thật sự
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Thêm các phương thức khác cho người dùng ở đây nếu cần
};

export default userService;
