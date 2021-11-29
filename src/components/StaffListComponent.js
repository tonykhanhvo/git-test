import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Col, Modal, ModalHeader, ModalBody, FormFeedback } from 'reactstrap';
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
      isOpenModal: false,
      formStaff: {
        name: '',
        doB: '',
        startDate: '',
        department: 'Sale',
        salaryScale: 1,
        annualLeave: 0,
        overTime: 0,
      },
      touched: {
        name: false,
        doB: false,
        startDate: false,
        department: false,
        salaryScale: false,
        annualLeave: false,
        overTime: false
      }
    }
    this.staffs = JSON.parse(JSON.stringify(this.props.staffs));
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddForm = this.handleAddForm.bind(this);
    this.handleBlur = this.handleBlur.bind(this)
  }

  //Handle Event of Adding New Staff - Controlled Form
  toggleModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      formStaff: {...this.state.formStaff, [name]: value},
    })
  }
  
  handleAddForm(event) {
    event.preventDefault();

    if (this.state.formStaff.doB && this.state.formStaff.startDate) {
      let doB = (new Date(this.state.formStaff.doB)).toISOString();
      let startDate = (new Date(this.state.formStaff.startDate)).toISOString();
      const newStaff = {
        id: this.staffs.length,
        name: this.state.formStaff.name,
        doB: doB,
        startDate: startDate,
        department: this.state.formStaff.department,
        salaryScale: this.state.formStaff.salaryScale,
        annualLeave: this.state.formStaff.annualLeave,
        overTime: this.state.formStaff.overTime
      }
      console.log(newStaff);
      // this.props.addNewStaff(newStaff);
  
      this.toggleModal();
      this.setState({
        formStaff: {
          name: '',
          doB: '',
          startDate: '',
          salaryScale: 1,
          annualLeave: 0,
          overTime: 0
        }
      });
    }
  }

  //Validator Form Add New Staff
  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true} 
    })
  }

  validate(name, doB, startDate, department, salaryScale, annualLeave, overTime) {
    const errors = {
      name: '',
      doB: '',
      startDate: '',
      salaryScale: '',
      annualLeave: '',
      overTime: ''
    };

    if (!name) {
      errors.name = 'Yêu cầu nhập'
    } else if (this.state.touched.name && name.length < 3) {
      errors.name = 'Yêu cầu nhiều hơn 2 ký tự'
    } else if (this.state.touched.name && name.length >30) {
      errors.name = 'Yêu cầu ít hơn 30 ký tự'
    }

    if (!doB) {
      errors.doB = 'Yêu cầu nhập'
    }

    if (!startDate) {
      errors.startDate = 'Yêu cầu nhập'
    }

    const reg = /^d+$/;
    if (this.state.touched.salaryScale && !reg.test(salaryScale)) {
      errors.salaryScale = 'Yêu cầu nhập số'
    }
    if (this.state.touched.annualLeave && !reg.test(annualLeave)) {
      errors.annualLeave = 'Yêu cầu nhập số'
    }
    if (this.state.touched.overTime && !reg.test(overTime)) {
      errors.overTime = 'Yêu cầu nhập số'
    }

    return errors;
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
    this.sortStaffItem(this.state.sortBy);

    const errors = this.validate(
      this.state.formStaff.name,
      this.state.formStaff.doB,
      this.state.formStaff.startDate,
      this.state.formStaff.salaryScale,
      this.state.formStaff.annualLeave,
      this.state.formStaff.overTime
      )

    const stafflist = this.staffs.map((staff) => {
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
                  <Form onSubmit={this.handleAddForm}>
                    <FormGroup row>
                      <Label htmlFor="name" md={4}>Họ và tên</Label>
                      <Col md={8}>
                        <Input type="text" id="name" name="name"
                          value={this.state.formStaff.name}
                          valid={errors.name === ''}
                          invalid={errors.name !== ''}
                          onChange={this.handleInputChange}
                          onBlur={this.handleBlur('name')}
                        />
                        <FormFeedback>{errors.name}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                      <Col md={8}>
                        <Input type="date" id="doB" name="doB"
                          value={this.state.formStaff.doB}
                          valid={errors.doB === ''}
                          invalid={errors.doB !== ''}
                          onBlur={this.handleBlur('doB')}
                          onChange={this.handleInputChange}
                        />
                        <FormFeedback>{errors.doB}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                      <Col md={8}>
                        <Input type="date" id="startDate" name="startDate"
                          value={this.state.startDate}
                          valid={errors.startDate === ''}
                          invalid={errors.startDate !== ''}
                          onBlur={this.handleBlur('startDate')}
                          onChange={this.handleInputChange}
                        />
                        <FormFeedback>{errors.startDate}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="department" md={4}>Phòng ban</Label>
                      <Col md={8}>
                        <Input type="select" id="department" name="department"
                          value={this.state.formStaff.department}
                          onChange={this.handleInputChange}>
                            <option>Sale</option>
                            <option>HR</option>
                            <option>Marketing</option>
                            <option>IT</option>
                            <option>Finance</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                      <Col md={8}>
                        <Input type="number" id="salaryScale" name="salaryScale"
                          value={this.state.formStaff.salaryScale}
                          valid={errors.salaryScale === ''}
                          invalid={errors.salaryScale !== ''}
                          onBlur={this.handleBlur('salaryScale')}
                          onChange={this.handleInputChange}
                        />
                        <FormFeedback>{errors.salaryScale}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                      <Col md={8}>
                        <Input type="number" id="annualLeave" name="annualLeave"
                          value={this.state.formStaff.annualLeave}
                          valid={errors.annualLeave === ''}
                          invalid={errors.annualLeave !== ''}
                          onBlur={this.handleBlur('annualLeave')}
                          onChange={this.handleInputChange}
                        />
                        <FormFeedback>{errors.annualLeave}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                      <Col md={8}>
                        <Input type="number" id="overTime" name="overTime"
                          value={this.state.formStaff.overTime}
                          valid={errors.overTime === ''}
                          invalid={errors.overTime !== ''}
                          onBlur={this.handleBlur('overTime')}
                          onChange={this.handleInputChange}
                        />
                        <FormFeedback>{errors.overTime}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={{size: 8, offset: 4}}>
                        <Button type="submit" color="primary">Thêm</Button>
                      </Col>
                    </FormGroup>
                  </Form>
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