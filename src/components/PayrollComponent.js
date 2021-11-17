import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, CardText, Breadcrumb, BreadcrumbItem, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { STAFFS } from '../shared/staffs';

function RenderPayrollItem({ staff }) {

  const basicSalary = 3000000;
  const overTimeSalary = 200000;

  return (
      <Card>
        <CardHeader className="text-center">
          <Link to={`/staffs/${staff.id}`}>
            <CardTitle tag="h4">{staff.name}</CardTitle>
          </Link>
        </CardHeader>
        <CardBody>
          <CardText>Mã nhân viên: {staff.id}</CardText>
          <CardText>Hệ số lương: {staff.salaryScale}</CardText>
          <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
        </CardBody>
        <CardFooter className="text-center">
          <CardTitle>Lương: {(parseInt((basicSalary*staff.salaryScale + overTimeSalary*staff.overTime),10)).toLocaleString("vi-VN")}
          </CardTitle>
        </CardFooter>
      </Card>
  );
}

class PayrollList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
    }
  }

  render() {
    const payrolllist = this.props.staffs.map((staff) => {
      return (
        <div key={staff.id} className="col-12 col-md-6 col-lg-4 my-1">
          <RenderPayrollItem staff={staff} />
        </div>
      );
    });
  
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb className="breadcrumb-arrow my-1">
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
          {payrolllist}
        </div>
      </div>
    );
  }
}

export default PayrollList;