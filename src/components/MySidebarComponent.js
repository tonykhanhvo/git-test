import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

class MySidebar extends Component {
  render() {
    return (
      <nav
        className="col-md-2 d-none d-md-block bg-light sidebar"
      >
        <div className="sidebar-sticky">
          <Nav
            vertical
          >
            <NavItem>
              <NavLink href="/">Nhân viên</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Phòng ban</NavLink>
            </NavItem>
          </Nav>
        </div>
      </nav>
    );
  }
}

export default MySidebar;