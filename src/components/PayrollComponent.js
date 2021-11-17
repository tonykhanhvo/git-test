import React from 'react';
import { Table } from 'reactstrap';

function RenderPayrollList({ staff, stt}) {

  const basicSalary = 3000000;
  const overTimeSalary = 200000;

  return (
    <tr key={staff.id} > 
      <th scope="row">
        {stt + 1}
      </th>
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
      <td>
        {parseInt((basicSalary*staff.salaryScale + overTimeSalary*staff.overTime),10)}
      </td>
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
    <Table striped>
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
        <RenderPayrollList staffs={staffs} />
      </tbody>
    </Table>
  );
}

export default PayrollList;