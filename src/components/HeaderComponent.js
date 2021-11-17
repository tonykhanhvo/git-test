import React, { Component } from "react";
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavbarBrand } from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  render() {
    return (
      <Navbar dark expand="lg">
        <div className="container-fluid">
          <NavbarToggler onClick={this.toggleNav} />
          <NavbarBrand className="mr-auto order-first" href="/">
            <img src="assets/images/hrmapp.png" height="50" width="135"
              alt="HRM App" />
          </NavbarBrand>
          <Collapse isOpen={this.state.isNavOpen} navbar className="justify-content-between">
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/staffs">
                <i className="fa fa-users" aria-hidden="true"></i> Nhân Viên
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/departments">
                <i className="fa fa-id-card-o" aria-hidden="true"></i> Phòng Ban
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/payroll">
                <i className="fa fa-money" aria-hidden="true"></i> Bảng Lương
                </NavLink>
              </NavItem>
            </Nav>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fa fa-search" aria-hidden="true"></i> Search</button>
            </form>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Header;