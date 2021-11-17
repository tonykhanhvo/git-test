import React from 'react';
import { Table } from 'reactstrap';

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
        {staff.department.name}
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
        <div className="col-12">
          <h3>Bảng Lương</h3>
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
                  Phòng Ban
                </th>
                <th>
                  Hệ số lương
                </th>
                <th>
                  Giờ làm thêm
                </th>
                <th>
                  Lương
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