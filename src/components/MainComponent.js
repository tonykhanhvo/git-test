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
import { fetchStaffs, fetchDepartments } from '../redux/actions/ActionCreators';

const mapStateToProps = state => ({
  staffs: state.staffs,
  departments: state.departments
})

const mapDispatchToProps = dispatch => ({
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepartments: () => {dispatch(fetchDepartments())}
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchStaffs()
    this.props.fetchDepartments()
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
          departments={this.props.departments.departments} />
      );
    }

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
              departments={this.props.departments.departments} />} 
          />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route path="/search/:staffName" component={SearchStaffList} />
          <Route exact path="/departments" component={() => <DepartmentList
            departments={this.props.departments.departments}
            departmentsLoading={this.props.departments.isLoading}
            departmentsErrMess={this.props.departments.errMess} />}
          />
          <Route exact path="/payroll" component={() => <PayrollList staffs={this.props.staffs.staffs} />} />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));