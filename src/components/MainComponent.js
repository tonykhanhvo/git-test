import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import DepartmentList from './DepartmentListComponent';
import PayrollList from './PayrollComponent';
import { STAFFS } from '../shared/staffs';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import StaffDetail from './StaffDetailComponent';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
    };
  }

  addNewStaff(newStaff) {
    this.setState({
      staffs: [...this.state.staffs, newStaff]
    })
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
      );
    }

    const SearchStaffList = ({ match }) => {

      const staffs = this.state.staffs.filter((staff) => {
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
            <StaffList addNew={(newStaff) => this.addNewStaff(newStaff)} staffs={this.state.staffs} />} 
          />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route path="/search/:staffName" component={SearchStaffList} />
          <Route exact path="/departments" component={() => <DepartmentList />} />
          <Route exact path="/payroll" component={() => <PayrollList staffs={this.state.staffs} />} />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;