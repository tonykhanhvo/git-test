import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class MyNavbar extends Component {
  render() {
    return (<Navbar
          color="dark"
          dark
          expand="md"
          light
          className="sticky-top flex-md-nowrap p-0 container-fluid"
        >
          <NavbarBrand className="col-12 mr-0" href="/">ỨNG DỤNG QUẢN LÝ NHÂN SỰ V1.0</NavbarBrand>
        </Navbar>);
  }
}

export default MyNavbar;