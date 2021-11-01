import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, Form, FormGroup, Label, Input } from 'reactstrap';
import StaffDetail from './StaffDetailComponent';


class StaffList extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      selectedStaff : null,
      selectedColumn : "col-12 col-md-6 col-lg-4",
    }
  }

  onSelectedStaff(staff) {
    this.setState({ selectedStaff: staff});
  }

  setColum(column) {
    this.setState({selectedColumn: column});
  }

  renderStaffs() {
    const staffs = this.props.staffs;
  
    const staffList = staffs.map((staff) => {
      return (
        <div key={staff.id} className={this.state.selectedColumn + " mt-3"}>
          <Card onClick={() => {
            setTimeout(() => document.getElementById("staffdetail").scrollIntoView(), 100)
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
          <Form inline className="offset-7 offset-md-8 offset-lg-9">
            <FormGroup>
              <Label for="splitColumn" className="mr-2">
                Hiển thị:
              </Label>
              <Input
                id="splitColumn"
                name="NoColumn"
                type="select"
                onChange={() => {
                  let column = document.getElementById("splitColumn").value;
                  return this.setColum(column);
                }}
              >
                <option value="col-12 col-md-6 col-lg-4">Default</option>
                <option value="col-12">1 Cột</option>
                <option value="col-6">2 Cột</option>
                <option value="col-4">3 Cột</option>
                <option value="col-3">4 Cột</option>
                <option value="col-2">6 Cột</option>
              </Input>
            </FormGroup>
          </Form>
        </div>
          <div className="row">
            {this.renderStaffs()}
          </div>
          <StaffDetail staff={this.state.selectedStaff} />
      </div>
    );
  }
}

export default StaffList;