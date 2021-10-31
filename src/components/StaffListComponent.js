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

  renderStaffs() {
    const staffs = this.props.staffs;
  
    const staffList = staffs.map((staff) => {
      return (
        <div key={staff.id} className="col-12 col-md-6 col-lg-4 mt-3">
          <Card onClick={() => {
            setTimeout(() => document.getElementById("staffdetail").scrollIntoView(), 50)
            return this.onSelectedStaff(staff);
          }}
          >
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardBody>
              <CardTitle>{staff.name}</CardTitle>
            </CardBody>
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
            {this.renderStaffs()}
          </div>
          <StaffDetail staff={this.state.selectedStaff} />
      </div>
    );
  }
}

export default StaffList;