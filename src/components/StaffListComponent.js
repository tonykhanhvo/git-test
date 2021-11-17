import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

  function RenderStaffItem({ staff }) {
    return (
      <Card>
        <Link to={`/staffs/${staff.id}`} >
          <CardImg width="100%" src={staff.image} alt={staff.name} />
          <CardBody className="py-2 px-1">
            <CardTitle className="text-dark text-center">{staff.name}</CardTitle>
          </CardBody>
        </Link>
      </Card>
    );
  }

  class StaffList extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        sortby: "StaffId",
      }
    }

    sortStaffItem() {

    }

    render() {
      const stafflist = this.props.staffs.map((staff) => {
        return (
          <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
            <RenderStaffItem staff={staff}/>
          </div>
        );
      });
  
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>Nhân Viên</h3>
              <hr />
            </div>
          </div>
          <div className="row mb-3">
            <Form inline className="col-12">
              <FormGroup>
                <Label className="mr-2">
                  Sắp xếp:
                </Label>
              </FormGroup>
              <FormGroup>
                <Input
                  id="sortStaff"
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
            {stafflist}
          </div>
        </div>
      );
    }
  }

export default StaffList;