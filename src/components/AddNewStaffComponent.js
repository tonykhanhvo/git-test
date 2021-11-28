import React from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';

class AddNewStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      formStaff: {
        name: '',
        doB: '',
        salaryScale: 1,
        startDay: '',
        department: 'Sale',
        annualLeave: 0,
        overTime: 0
      }
    }

    this.toggleModal = this.toggleModal.bind(this);
    
  }

  toggleModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    })
  }

  render() {
    return(
      <Modal isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Thêm Nhân viên mới</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleAddForm}>
            <FormGroup row>
              <Label htmlFor="fullname" md={2}>HỌ và tên</Label>
              <Col md={10}>
                <Input type="text" id="fullname" name="fullname"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="birthday" md={2}>Ngày sinh</Label>
              <Col md={10}>
                <Input type="date" id="birthday" name="birthday"
                  value={this.state.doB}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="startday" md={2}>Ngày vào công ty</Label>
              <Col md={10}>
                <Input type="date" id="startday" name="startday"
                  value={this.state.startDay}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="department" md={2}>Phòng ban</Label>
              <Col md={10}>
                <Input type="select" id="department" name="department"
                  value={this.state.department}
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
              <Label htmlFor="salaryscale" md={2}>Hệ số lương</Label>
              <Col md={10}>
                <Input type="number" id="salaryscale" name="salaryscale"
                  value={this.state.salaryScale}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="annualleave" md={2}>Số ngày nghỉ còn lại</Label>
              <Col md={10}>
                <Input type="number" id="annualleave" name="annualleave"
                  value={this.state.annualLeave}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="overtime" md={2}>Số ngày đã làm thêm</Label>
              <Col md={10}>
                <Input type="number" id="overtime" name="overtime"
                  value={this.state.overTime}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{size: 10, offset: 2}}>
                <Button type="submit" color="primary">Thêm</Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddNewStaff;