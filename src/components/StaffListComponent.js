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
        sortBy: "StaffId",
      }
      this.staffs = JSON.parse(JSON.stringify(this.props.staffs));
    }

    setSortBy(sortBy) {
      this.setState({sortBy: sortBy});
    }

    sortStaffItem(sortBy) {
      const staffs = this.staffs;
      switch(sortBy) {
        default : {
          staffs.sort((staff1, staff2) => staff1.id - staff2.id);
          break;
        }
        case 'StaffIdReverse' : {
          staffs.sort((staff1, staff2) => staff2.id - staff1.id);
          break;
        }
        case 'StaffName' : {
          staffs.sort((staff1, staff2) => {
            let name1 = staff1.name.split(' ');
            let firstname1 = name1[name1.length - 1].toUpperCase();
            let name2 = staff2.name.split(' ');
            let firstname2 = name2[name1.length - 1].toUpperCase();
            if (firstname1 < firstname2) {return -1};
            if (firstname1 > firstname2) {return 1};
            return 0;
          });
          break;
        }
        case 'StaffNameReverse' : {
          staffs.sort((staff1, staff2) => {
            let name1 = staff1.name.split(' ');
            let firstname1 = name1[name1.length - 1].toUpperCase();
            let name2 = staff2.name.split(' ');
            let firstname2 = name2[name1.length - 1].toUpperCase();
            if (firstname1 < firstname2) {return 1};
            if (firstname1 > firstname2) {return -1};
            return 0;
          });
          break;
        }
      }
    }

    render() {
      this.sortStaffItem(this.state.sortBy);

      const stafflist = this.staffs.map((staff) => {
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
                  type="select"
                  onChange={() => {
                    let sortBy = document.getElementById("sortStaff").value;
                    return this.setSortBy(sortBy);
                  }}
                >
                  <option>Choose ...</option>
                  <option value="StaffId">Mã nhân viên A-Z</option>
                  <option value="StaffIdReverse">Mã nhân viên Z-A</option>
                  <option value="StaffName">Tên A-Z</option>
                  <option value="StaffNameReverse">Tên Z-A</option>
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