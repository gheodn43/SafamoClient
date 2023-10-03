import api from './api';

const requestDetailService = {
    landlordReqDetail: async () => {
        // ...
      },
      acceptlandlordReq: async () => {
        // gọi đến api http://localhost:8080/api/administration/grantAdminRole?user_id=1 (với user_id được lấy từ request)
        // trả về ResponseEntity<String>
        // yêu cầu tham số truyền vào user_id và request_id
      },
};

export default requestDetailService;