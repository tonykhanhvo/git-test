import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardBody, CardTitle, CardText } from 'reactstrap';


class StaffList extends Component {

  constructor(props) {
    super(props)
    
  }

  renderStaff() {
    const staffs = this.props.staffs;

    if (staffs != null) {
      const staffList = staffs.map((staff) => {
        return (
          <div key={staff.id} className="col-12 col-md-6 col-lg-4 m-1">
            <Card>
              <CardImg width="100%" src={staff.image} alt={staff.name} />
              <CardImgOverlay>
                <CardTitle>{staff.name}</CardTitle>
              </CardImgOverlay>
            </Card>
          </div>
        );
      });
      return (staffList);
    } else {
      return (<div></div>);
    }
  }

  render() {

    return (
      <div className="container">
            <div className="row">
              {this.renderStaff}
            </div>
          </div>
    );
  }
}

export default StaffList;