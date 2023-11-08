import React from 'react';
import AdminBaseLayout from './layoutComponents/AdminBaseLayout';
import LanlordRequestTable from './DataDisplayComponents/Tables/landlordRequestTable'
import ReactApexChart from 'react-apexcharts';

const AdminHomePage = () => {
  const barChartOptions = {
    series: [
      {
        data: [10, 8, 6, 4, 2],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ['#246dec', '#cc3c43', '#367952', '#f5b74f', '#4f35a1'],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ['Laptop', 'Phone', 'Monitor', 'Headphones', 'Camera'],
    },
    yaxis: {
      title: {
        text: 'Count',
      },
    },
  };
  const areaChartOptions = {
    series: [
      {
        name: 'Lượng đăng ký mới',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 36, 12, 0],
      },
    ],
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    colors: ['#4f35a1', '#246dec'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    labels: ['thg-1', 'thg-2', 'thg-3', 'thg-4', 'thg-5', 'thg-6', 'thg-7', 'thg-8', 'thg-9', 'thg-10', 'thg-11', 'th-12'],
    markers: {
      size: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };
  return (
    <AdminBaseLayout>
      {/* <LanlordRequestTable /> */}
      <div class="main-cards">

        <div class="card">
          <div class="card-inner">
            <p class="text-primary">BẤT ĐỘNG SẢN</p>
            <span class="material-icons-outlined text-blue"><i class="fa fa-building-o" aria-hidden="true"></i></span>
          </div>
          <span class="text-primary font-weight-bold">12</span>
        </div>

        <div class="card">
          <div class="card-inner">
            <p class="text-primary">PHÒNG</p>
            <span class="material-icons-outlined text-orange"><i class="fa fa-bed" aria-hidden="true"></i></span>
          </div>
          <span class="text-primary font-weight-bold">83</span>
        </div>

        <div class="card">
          <div class="card-inner">
            <p class="text-primary">NGƯỜI DÙNG</p>
            <span class="material-icons-outlined text-green"><i class="fa fa-user-o" aria-hidden="true"></i> </span>
          </div>
          <span class="text-primary font-weight-bold">79</span>
        </div>

        <div class="card">
          <div class="card-inner">
            <p class="text-primary">CAM KẾT</p>
            <span class="material-icons-outlined text-red"><i class="fa fa-file-text" aria-hidden="true"></i></span>
          </div>
          <span class="text-primary font-weight-bold">56</span>
        </div>

      </div>
      <div class="charts">
        <div class="charts-card">
          <p class="chart-title">Top 5 Bất Động sản</p>
          <ReactApexChart options={barChartOptions} series={barChartOptions.series} type="bar" height={350} />
        </div>

        <div class="charts-card">
          <p class="chart-title">Lượng đăng ký mới</p>
          <ReactApexChart options={areaChartOptions} series={areaChartOptions.series} type="bar" height={350} />
        </div>

      </div>
    </AdminBaseLayout>
  );
};

export default AdminHomePage;