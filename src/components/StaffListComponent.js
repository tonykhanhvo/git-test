import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Col, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

export const RenderStaffItem = ({ staff }) => {
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
      isOpenModal: false
    }
    this.staffs = JSON.parse(JSON.stringify(this.props.staffs));
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  // componentDidMount() {
  //   this.staffs = JSON.parse(JSON.stringify(this.props.staffs));
  // }

  //Open - Close Modal
  toggleModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    })
  }
  
  //Handle Event of Adding New Staff - Controlled Form
  handleAddForm(values) {
    if (values.name && values.doB && values.startDate) {
      let doB = (new Date(values.doB)).toISOString();
      let startDate = (new Date(values.startDate)).toISOString();
      let salaryScale = Number(values.salaryScale);
      let annualLeave = Number(values.annualLeave);
      let overTime = Number(values.overTime);
      let salary = 3000000*salaryScale + 200000*overTime;
      const newStaff = {
        id: this.staffs.length,
        name: values.name,
        doB: doB,
        startDate: startDate,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
        image: '/assets/images/alberto.png',
        salary: salary
      }
      switch (values.department) {
        default:
          newStaff.department = this.props.departments[0];
          break;
        case 'HR':
          newStaff.department = this.props.departments[1];
          break;
        case 'Marketing':
          newStaff.department = this.props.departments[2];
          break;
        case 'IT':
          newStaff.department = this.props.departments[3];
          break;
        case 'Finance':
          newStaff.department = this.props.departments[4];
          break;
      }

      console.log(newStaff);
      
      //Push New Staff into staffs in MainComponent
      this.props.addNewStaff(newStaff);
  
      this.toggleModal();
    }
  }

  setThisStaffs(newStaff) {
    this.props.staffs = [ ...this.props.staffs, newStaff ]
  }

  //Handle Event of Searching Staff Uncontrolled Form
  handleFormSubmit(event) {
    event.preventDefault();
    let searchName = this.search.value;
    console.log(searchName)
    window.location.pathname = `/search/${searchName}`;
  }

  //Handle Event of Sorting Staff List
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
    this.staffs = JSON.parse(JSON.stringify(this.props.staffs));
    this.sortStaffItem(this.state.sortBy);
    
    const stafflist = this.props.staffsLoading ? <Loading /> : 
      this.props.staffsErrMess ? <h4>{this.props.staffsErrMess}</h4> :
      this.staffs.map((staff) => {
        return (
          <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
            <RenderStaffItem staff={staff}/>
          </div>
        );
      });

    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 col-md-6 my-1">
            <div className="row justify-content-between pr-lg-5">
              <div className="col-auto">
                <h3>Nhân Viên</h3>
              </div>
              {/* ------- Button Add New ------- */}
              <div className="col-auto mr-lg-5">  
                <Button onClick={this.toggleModal} color="dark">
                  <span className="fa fa-plus-square"></span> Add New
                </Button> 
              </div>
              {/* ------- Modal Add New Staff ------- */}
              <Modal isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Thêm Nhân viên mới</ModalHeader>
                <ModalBody>
                  <LocalForm onSubmit={(values) => this.handleAddForm(values)}>
                    <Row className="form-group">
                      <Label htmlFor="name" md={4}>Họ và tên</Label>
                      <Col md={8}>
                        <Control.text model=".name" id="name" name="name"
                          className="form-control"
                          validators={{
                            required, minLength: minLength(2), maxLength: maxLength(30)
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".name"
                          show="touched"
                          messages={{
                            required: 'Yêu cầu nhập ',
                            minLength: 'Yêu cầu nhập nhiều hơn 2 ký tự',
                            maxLength: 'Yêu cầu nhập ít hơn 30 ký tự'
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                      <Col md={8}>
                        <Control.input model=".doB" type="date" id="doB" name="doB"
                          className="form-control"
                          value={this.state.tenState}
                          validators={{ 
                            required
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".doB"
                          show="touched"
                          messages={{
                            required: 'Yêu cầu nhập'
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                      <Col md={8}>
                        <Control.input model=".startDate" type="date" id="startDate" name="startDate"
                          className="form-control"
                          value={this.state.tenState}
                          validators={{
                            required
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".startDate"
                          show="touched"
                          messages={{
                            required: 'Yêu cầu nhập',
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="department" md={4}>Phòng ban</Label>
                      <Col md={8}>
                        <Control.select model=".department" id="department" name="department"
                          className="form-control"
                          defaultValue="Sale">
                          <option>Sale</option>
                          <option>HR</option>
                          <option>Marketing</option>
                          <option>IT</option>
                          <option>Finance</option>
                        </Control.select>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                      <Col md={8}>
                        <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                          className="form-control"
                          defaultValue="1"
                          validators={{
                            isNumber
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".salaryScale"
                          show="touched"
                          messages={{
                            isNumber: 'Yêu cầu nhập số'
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                      <Col md={8}>
                        <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                          className="form-control"
                          defaultValue="0"
                          validators={{
                            isNumber
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".annualLeave"
                          show="touched"
                          messages={{
                            isNumber: 'Yêu cầu nhập số'
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                      <Col md={8}>
                        <Control.text model=".overTime" id="overTime" name="overTime"
                          className="form-control"
                          defaultValue="0"
                          validators={{
                            isNumber
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".overTime"
                          show="touched"
                          messages={{
                            isNumber: 'Yêu cầu nhập số'
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={{size: 8, offset: 4}}>
                        <Button type="submit" color="primary">Thêm</Button>
                      </Col>
                    </Row>
                  </LocalForm>
                </ModalBody>
              </Modal>
            </div>
          </div>
          {/* ------- Search Form - Uncontrolled Form ------- */}
          <div className="col-12 col-md-6 my-1">
            <Form onSubmit = {this.handleFormSubmit}>
              <FormGroup row className="justify-content-between">
                <Col>
                  <Input type="text" id="search" name="search"
                    innerRef={(input) => this.search = input} />
                </Col>
                <Col xs="auto">
                  <Button type="submit" value="submit" color="primary">
                    <span className="fa fa-search"></span> Search
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
        <hr />
        {/* ------- Sort Form ------- */}
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
        {/* ------- Render Staff List ------- */}
        <div className="row">
          {stafflist}
        </div>
      </div>
    );
  }
}

export default StaffList;