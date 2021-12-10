import React from "react";
import { Media, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";

function RenderStaff({ staff, departments }) {
  let departmentStaff = '';
  departments.forEach(department => {
    if (staff.departmentId === department.id) {
      departmentStaff = department.name
    }
  })

  return (
    <div className="col-12 m-1">
      <Media tag="li">
        <Media left middle>
          <Media object src={staff.image} alt={staff.name} className="img-staff" />
        </Media>
        <Media body className="ml-5">
          <Media heading>Họ và tên: {staff.name}</Media>
          <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
          <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
          <p>Phòng ban: {departmentStaff}</p>
          <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
          <p>Số giờ đã làm thêm: {staff.overTime}</p>
        </Media>
      </Media>
    </div>
  );
}

const StaffDetail = (props) => {
  if (props.staff != null) {
    return (
      <div className="container">
          <div className="row">
            <Breadcrumb className="my-1">
              <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">
            <RenderStaff staff={props.staff}
              departments={props.departments} />
          </div>
        </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}

export default StaffDetail;