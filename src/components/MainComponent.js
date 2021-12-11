import React, { Component } from 'react';
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import DepartmentList from './DepartmentListComponent';
import PayrollList from './PayrollComponent';
import StaffDetail from './StaffDetailComponent';
import { fetchStaffs, fetchDepartments, fetchDeptStaffs, fetchPayroll } from '../redux/actions/ActionCreators';
import DeptStaffList from './DeptStaffList';

const mapStateToProps = state => ({
  staffs: state.staffs,
  departments: state.departments,
  deptStaffs: state.deptStaffs,
  payroll: state.payroll
})

const mapDispatchToProps = dispatch => ({
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepartments: () => {dispatch(fetchDepartments())},
  fetchDeptStaffs: (deptId) => {dispatch(fetchDeptStaffs(deptId))},
  fetchPayroll: () => {dispatch(fetchPayroll())},
  resetAddStaffForm: () => {dispatch(actions.reset('newStaff'))}
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchStaffs()
    this.props.fetchDepartments()
    this.props.fetchPayroll()
  }

  render() {
    //Render Staff when click particular staff in Staff List
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
          departments={this.props.departments.departments} />
      );
    }

    //Render Staff List with Search Key
    const SearchStaffList = ({ match }) => {

      const staffs = this.props.staffs.staffs.filter((staff) => {
        let searchRegExp = new RegExp(`${match.params.staffName}`, "gi");
        return searchRegExp.test(staff.name)
      });

      if (staffs.length === 0) {
        return (<div className="container">
          <div className="row">
            <div className="col-12 my-5">
              <p>Không tìm thấy nhân viên phù hợp ...</p>
              <h5><Link to="/staffs">Quay về Trang chủ</Link></h5>
            </div>
          </div>
        </div>);
      } else {
        return (<StaffList staffs={staffs} />);
      }
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/staffs" component={() => 
            <StaffList 
              staffs={this.props.staffs.staffs}
              staffsLoading={this.props.staffs.isLoading}
              staffsErrMess={this.props.staffs.errMess}
              departments={this.props.departments.departments}
              resetAddStaffForm={this.props.resetAddStaffForm} />} 
          />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route path="/search/:staffName" component={SearchStaffList} />
          <Route exact path="/departments" component={() => <DepartmentList
            departments={this.props.departments.departments}
            departmentsLoading={this.props.departments.isLoading}
            departmentsErrMess={this.props.departments.errMess} />}
          />
          <Route path="/departments/:deptId" render={({ match }) => (
            <DeptStaffList deptId={match.params.deptId}
              fetchDeptStaffs={this.props.fetchDeptStaffs}
              staffs={this.props.deptStaffs}
              // staffsLoading={this.props.deptStaffs.isLoading}
              // staffsErrMess={this.props.deptStaffs.errMess}
              departments={this.props.departments.departments}
            />
          )}
          />
          <Route exact path="/payroll" component={() => <PayrollList staffs={this.props.payroll.payroll}
            payrollLoading={this.props.payroll.isLoading}
            payrollErrMess={this.props.payroll.errMess} />}
          />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));