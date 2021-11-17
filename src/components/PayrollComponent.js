import React from 'react';
import { Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderPayrollList({ staff, stt }) {

  const basicSalary = 3000000;
  const overTimeSalary = 200000;

  return (
    <tr key={staff.id} > 
      <td scope="row">
        {stt + 1}
      </td>
      <td>
        {staff.name}
      </td>
      <td>
        {staff.id}
      </td>
      <td>
        {staff.salaryScale}
      </td>
      <td>
      {staff.overTime}
      </td>
      <th>
        {(parseInt((basicSalary*staff.salaryScale + overTimeSalary*staff.overTime),10)).toLocaleString("vi-VN")}
      </th>
    </tr>
  );
}

const PayrollList = ({ staffs }) => {

  const payrolllist = staffs.map((staff, index) => {
    return (
      <RenderPayrollList staff={staff} stt={index} />
    );
  });

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb className="my-1">
          <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
          <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">
        <div className="col-12">
          <h3>Bảng Lương</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p><span className="font-weight-bold">Lương cơ bản: </span>3.000.000 VND</p>
          <p><span className="font-weight-bold">Lương giờ làm thêm: </span>200.000 VND</p>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Table striped className="table-text">
            <thead>
              <tr>
                <th>
                  STT
                </th>
                <th>
                  Họ và tên
                </th>
                <th>
                  Mã NV
                </th>
                <th>
                  Hệ số lương
                </th>
                <th>
                  Giờ làm thêm
                </th>
                <th>
                  Lương (VND)
                </th>
              </tr>
            </thead>
            <tbody>
              {payrolllist}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default PayrollList;