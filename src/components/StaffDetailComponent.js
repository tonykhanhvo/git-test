import React, { Component } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import dateFormat from "dateformat";


class StaffDetail extends Component {
  render() {
    const staff = this.props.staff;
    if (staff != null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-4 col-lg-2 my-1">
              <Card id="staffdetail">
                <CardImg width="100%" src={staff.image} alt={staff.name}/>
                <CardBody>
                  <CardTitle>Họ và tên: {staff.name}</CardTitle>
                  <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                  <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                  <CardText>Phòng ban: {staff.department.name}</CardText>
                  <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                  <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <h5 className="col-12 m-1">Bấm vào tên nhân viên để xem thông tin.</h5>
        </div>
      );
    }
  }
}

export default StaffDetail;