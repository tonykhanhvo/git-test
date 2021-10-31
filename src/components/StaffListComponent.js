import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardBody, CardTitle, CardText } from 'reactstrap';
import StaffDetail from './StaffDetailComponent';


class StaffList extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      selectedStaff : null
    }
  }

  onSelectedStaff(staff) {
    this.setState({ selectedStaff: staff});
  }

  renderStaff() {
    const staffs = this.props.staffs;
  
    const staffList = staffs.map((staff) => {
      return (
        <div key={staff.id} className="col-12 col-md-6 col-lg-4 m-1">
          <Card onClick={() => this.onSelectedStaff(staff)}>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardImgOverlay>
              <CardTitle>{staff.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    })
    return (staffList);
  }

  render() {
    return (
      <div className="container">
          <div className="row">
            {this.renderStaff}
          </div>
          <StaffDetail staff={this.selectedStaff} />
      </div>
    );
  }
}

export default StaffList;