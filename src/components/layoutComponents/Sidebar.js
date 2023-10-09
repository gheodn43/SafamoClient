import React from 'react';

const Sidebar = () => {
  return (
    <div class="list-group" id="list-tab" role="tablist">
      <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#dashboard" role="tab" aria-controls="dashboard">Thống kê</a>
      <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#noticification" role="tab" aria-controls="noticification">Thông báo</a>
      <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#property" role="tab" aria-controls="property">Bất động sản</a>
      <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#report" role="tab" aria-controls="report">Báo cáo</a>
      <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#tag" role="tab" aria-controls="tag">tags</a>
      <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#user" role="tab" aria-controls="user">Người dùng</a>
    </div>
  );
};

export default Sidebar;
