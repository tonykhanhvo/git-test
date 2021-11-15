import React, { Component } from "react";
import { NavbarBrand } from "reactstrap";

import './Header.css';

class Header extends Component {
  render() {
    <div className="container-fluid fixed-top">
      <div className="row justify-content-between">
        <div className="col-5 order-2 order-lg-first">
          <img src="assets/images/hrmapp.png" height="23px" width="97px" />
        </div>
        <div className="col-2 col-md-auto"></div>
        <div className="col-2 col-md-auto"></div>
      </div>
    </div>
  }
}

export default Header;