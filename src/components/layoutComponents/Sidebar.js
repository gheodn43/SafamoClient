import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className="list-group" id="list-tab" role="tablist">
      <NavLink to="/admin" className="list-group-item list-group-item-action nav-link" activeClassName="active" >Thống kê</NavLink>
      <NavLink to="/admin/notification" className="list-group-item list-group-item-action nav-link" activeClassName="active">Thông báo</NavLink>
      <NavLink to="/admin/request" className="list-group-item list-group-item-action nav-link" activeClassName="active">Yêu cầu</NavLink>
      <NavLink to="/admin/property" className="list-group-item list-group-item-action nav-link" activeClassName="active">Bất động sản</NavLink>
      <NavLink to="/admin/report" className="list-group-item list-group-item-action nav-link" activeClassName="active"> Báo cáo</NavLink>
      <NavLink to="/admin/tags" className="list-group-item list-group-item-action nav-link" activeClassName="active">Tags</NavLink>
      <NavLink to="/admin/user" className="list-group-item list-group-item-action nav-link" activeClassName="active">Người dùng</NavLink>
    </div>
  );
};

export default Sidebar;
