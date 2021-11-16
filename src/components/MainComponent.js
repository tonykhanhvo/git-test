import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import { STAFFS } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
    };
  }

  render() {

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/staffs" component={() => <StaffList staffs={this.state.staffs} />} />
          <Route path="/staffs/:dishId" component={DishWithId} />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;