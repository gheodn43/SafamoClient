import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className="list-group" id="list-tab" role="tablist">
      <NavLink to="/admin" className="list-group-item list-group-item-action nav-link" activeclassname="active" >Thống kê</NavLink>
      <NavLink to="/admin/notification" className="list-group-item list-group-item-action nav-link" activeclassname="active">Thông báo</NavLink>
      <NavLink to="/admin/request" className="list-group-item list-group-item-action nav-link" activeclassname="active">Yêu cầu</NavLink>
      <NavLink to="/admin/property" className="list-group-item list-group-item-action nav-link" activeclassname="active">Bất động sản</NavLink>
      <NavLink to="/admin/report" className="list-group-item list-group-item-action nav-link" activeclassname="active"> Báo cáo</NavLink>
      <NavLink to="/admin/tags" className="list-group-item list-group-item-action nav-link" activeclassname="active">Tags</NavLink>
      <NavLink to="/admin/user" className="list-group-item list-group-item-action nav-link" activeclassname="active">Người dùng</NavLink>
    </div>
  );
};

export default Sidebar;
