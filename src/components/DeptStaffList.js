import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Loading } from './LoadingComponent';
import StaffList, { RenderStaffItem } from './StaffListComponent';

class DeptStaffList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchDeptStaffs(this.props.deptId)
  }

  render() {
    let departmentsName = '';
    this.props.departments.forEach(department => {
      if(this.props.deptId === department.id) {
        departmentsName = department.name;
      }
    })

    // const stafflist = this.props.staffsLoading ? <Loading /> : 
    //   this.props.staffsErrMess ? <h4>{this.props.staffsErrMess}</h4> :
    //   this.props.staffs.map((staff) => {
    //     return (
    //       <div key={staff.id} className="col-6 col-md-4 col-lg-2 my-1">
    //         <RenderStaffItem staff={staff}/>
    //       </div>
    //     );
    //   });

    return(
      <React.Fragment>
        <div className="container">
          <div className="row">
            <Breadcrumb className="my-1">
              <BreadcrumbItem><Link to="/departments">Phòng Ban</Link></BreadcrumbItem>
              <BreadcrumbItem active>{departmentsName}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">
            <div className="col-12">
              <h3>{departmentsName}</h3>
              <hr />
            </div>
          </div>
          {/* <div className="row">
            {stafflist}
          </div> */}
        </div>
        <StaffList
          staffs={this.props.staffs.deptStaffs}
          staffsLoading={this.props.staffs.isLoading}
          staffsErrMess={this.props.staffs.errMess}
          departments={this.props.departments}
        />
      </React.Fragment>
    );
  }
}

export default DeptStaffList;