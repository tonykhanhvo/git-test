import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardBody, CardTitle, CardText } from 'reactstrap';
import dateFormat from "dateformat";


class StaffDetail extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const staff = this.props.staff;
    if (staff != null) {
      return (
        <div className="row">
          <div className="col-12 col-md-5 col-lg-4 m-1">
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
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default StaffDetail;