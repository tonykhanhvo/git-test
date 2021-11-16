import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class MyNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    }
    this.toggleNav = this.toggleNav.bind(this)
  }

  render() {
    return (<Navbar
          color="dark"
          dark
          expand="md"
          light
          className="sticky-top flex-md-nowrap p-0 container-fluid"
        >
          <NavbarBrand className="col-12 mr-0" href="/">
            <img src="assets/images/hrmapp.png" height="23px" width="97px" />
          </NavbarBrand>
        </Navbar>);
  }
}

export default MyNavbar;