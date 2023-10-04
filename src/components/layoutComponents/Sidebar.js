import React from 'react';


const Sidebar = () => {
  return (
    <nav id="sidebar" className="bg-light col-md-2">
      <div className="sidebar-header">
      </div>
      <ul className="list-unstyled components">
        <li>
          <a href="#thongke">Thống kê</a>
        </li>
        <li>
          <a href="#thongbao">Thông báo</a>
        </li>
        <li>
          <a href="#batdongsan">Bất động sản</a>
        </li>
        <li>
          <a href="#khieunai">Khiếu nại</a>
        </li>
        <li>
          <a href="#tags">Tags</a>
        </li>
        <li>
          <a href="#taikhoan">Tài khoản</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;