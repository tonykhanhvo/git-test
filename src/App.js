import React, { Component } from 'react';
import StaffList from './components/StaffListComponent';
import MyNavbar from './components/MyNavbarComponent';
import MySidebar from './components/MySidebarComponent';
import './App.css';
import { STAFFS } from  './shared/staffs';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS
    };
  }

  render() {
    return (
      <div>
        <MyNavbar />
        <div className="container-fluid">
          <div className="row">
            <MySidebar />
            <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <StaffList staffs={this.state.staffs} />
            </div>
          </div>
        </div>
        <div className="container-fluid text-center p-4 bg-secondary text-white font-weight-bold footer-page">
          © 2021 Copyright: Võ Gia Khánh - FX12517
        </div>
      </div>
    );
  }
}

export default App;