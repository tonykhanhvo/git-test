import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import DepartmentList from './DepartmentListComponent';
import PayrollList from './PayrollComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';
import StaffDetail from './StaffDetailComponent';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
    };
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/staffs" component={() => <StaffList staffs={this.state.staffs} />} />
          <Route path="/staffs/:staffId" component={StaffWithId} />
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