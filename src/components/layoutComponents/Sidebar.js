import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  return (
    // <div className="list-group" id="list-tab" role="tablist">
    //   <NavLink to="/admin" className="list-group-item list-group-item-action nav-link" activeclassname="active" >Thống kê</NavLink>
    //   <NavLink to="/admin/notification" className="list-group-item list-group-item-action nav-link" activeclassname="active">Thông báo</NavLink>
    //   <NavLink to="/admin/request" className="list-group-item list-group-item-action nav-link" activeclassname="active">Yêu cầu</NavLink>
    //   <NavLink to="/admin/property" className="list-group-item list-group-item-action nav-link" activeclassname="active">Bất động sản</NavLink>
    //   <NavLink to="/admin/report" className="list-group-item list-group-item-action nav-link" activeclassname="active"> Báo cáo</NavLink>
    //   <NavLink to="/admin/tags" className="list-group-item list-group-item-action nav-link" activeclassname="active">Tags</NavLink>
    //   <NavLink to="/admin/user" className="list-group-item list-group-item-action nav-link" activeclassname="active">Người dùng</NavLink>
    // </div>
    <aside id="sidebar">
    <div class="sidebar-title">
      <div class="sidebar-brand">
        Safamo's Admin
      </div>
      <span class="material-icons-outlined" onclick="closeSidebar()">close</span>
    </div>

    <ul class="sidebar-list">
      <li class="sidebar-list-item">
        <a href="/admin" target="_blank">
          <span class="material-icons-outlined"><i class="fa fa-bar-chart" aria-hidden="true"></i></span> Thống kê
        </a>
      </li>
      <li class="sidebar-list-item">
        <a href="/admin/notification" target="_blank">
          <span class="material-icons-outlined"><i class="fa fa-bullhorn" aria-hidden="true"></i></span> Thông báo
        </a>
      </li>
      <li class="sidebar-list-item">
        <a href="/admin/request" target="_blank">
          <span class="material-icons-outlined"><i class="fa fa-paper-plane" aria-hidden="true"></i></span> Yêu cầu
        </a>
      </li>
      <li class="sidebar-list-item">
        <a href="/admin/property" target="_blank">
          <span class="material-icons-outlined"><i class="fa fa-building" aria-hidden="true"></i></span> Bất động sản
        </a>
      </li>
      <li class="sidebar-list-item">
        <a href="/admin/tags" target="_blank">
          <span class="material-icons-outlined"><i class="fa fa-tags" aria-hidden="true"></i></span> Tags
        </a>
      </li>
      <li class="sidebar-list-item">
        <a href="/admin/user" target="_blank">
          <span class="material-icons-outlined"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span> Người dùng
        </a>
      </li>
    </ul>
  </aside>
  );
};

export default Sidebar;
