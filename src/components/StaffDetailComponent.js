import React from "react";
import { Media, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";
import AddStaffForm from "./AddStaffFormComponent";

function RenderStaff({ staff, departments }) {
  let departmentStaff = '';
  departments.forEach(department => {
    if (staff.departmentId === department.id) {
      departmentStaff = department.name
    }
  })

  return (
    <div className="col-12 m-1">
      <Media tag="li">
        <Media left middle>
          <Media object src={staff.image} alt={staff.name} className="img-staff" />
        </Media>
        <Media body className="ml-5">
          <Media heading>Họ và tên: {staff.name}</Media>
          <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
          <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
          <p>Phòng ban: {departmentStaff}</p>
          <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
          <p>Số giờ đã làm thêm: {staff.overTime}</p>
        </Media>
      </Media>
    </div>
  );
}

class StaffDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false,
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    })
  }

  render() {

    if (this.props.staff != null) {
      return (
        <div className="container mb-3">
          <div className="row">
            <Breadcrumb className="my-1">
              <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
              <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">
            <RenderStaff staff={this.props.staff}
              departments={this.props.departments} />
          </div>
          <div className="row justify-content-center pr-lg-5">
            <div className="col-auto mr-lg-5">  
              <Button onClick={this.toggleModal} color="info" className="mr-3">
                <span className="fa fa-pencil-square"></span> Cập nhật
              </Button>
              <Button color="danger">
                <span className="fa fa-trash"></span> Xóa
              </Button> 
            </div>
            <Modal isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Thêm Nhân viên mới</ModalHeader>
                <ModalBody>
                  <AddStaffForm toggleModal={this.toggleModal}
                    resetAddStaffForm={this.props.resetAddStaffForm}
                  />
                </ModalBody>
              </Modal>
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default StaffDetail;