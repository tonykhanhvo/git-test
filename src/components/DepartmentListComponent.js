import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

function RenderDepartmentItem({ department }) {
  return (
    <Card>
      <CardBody>
        <CardTitle>{department.name}</CardTitle>
        <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
      </CardBody>
    </Card>
  );
}

class DepartmentList extends React.Component {

  render() {
    const departmentlist = this.props.departments.map((department) => {
      return (
        <div key={department.id} className="col-12 col-md-6 col-lg-4 my-1">
          <RenderDepartmentItem department={department} />
        </div>
      );
    });
  
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Phòng Ban</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          {departmentlist}
        </div>
      </div>
    );
  }
}

export default DepartmentList;
