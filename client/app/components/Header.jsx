import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="nav-wrapper">
      <Navbar collapseOnSelect bg="light" expand="lg">
        <Navbar.Brand href="/">DOCkie</Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Link className="nav-link" to="/">
            Home{' '}
          </Link>
          <Link
            // className="nav-link"
            to={{
              pathname: '/signup',
              state: { modal: true },
            }}
          >
            Sign up
          </Link>
          <Link
            className="nav-link"
            to={{
              pathname: '/login',
              state: { modal: true },
            }}
          >
            Login
          </Link>
        </Nav>
      </Navbar>
    </div>
    // (<ul>
    //   {token && (
    //     <li>
    //       {' '}
    //       <Link to="/dashboard/document">Create Document </Link>{' '}
    //     </li>
    //   )}
    //   {token && (
    //     <li>
    //       {' '}
    //       <Link to="/dashboard"> Dashboard</Link>
    //     </li>
    //   )}
    //   {token && (
    //     <li>
    //       {' '}
    //       <Link to="/users"> Users</Link>
    //     </li>
    //   )}
    //   {token && (
    //     <li>
    //       {' '}
    //       <Link to="/roles"> Manage Role</Link>
    //     </li>
    //   )}
    //   {token && (
    //     <li>
    //       <form onSubmit={this.handleSearchSubmit}>
    //         <div className="input-field">
    //           <InputGroup
    //             placeholder="Search Here"
    //             id="search"
    //             onChange={this.handleSearchChange}
    //             type="text"
    //             required
    //             name="searchInput"
    //             value={this.state.searchInput}
    //             label={<i className="material-icons">search</i>}
    //           />
    //           <i className="material-icons">close</i>
    //         </div>
    //       </form>
    //     </li>
    //   )}
    //   {token && (
    //     <button id={this.handleLogout} onClick={this.handleLogout}>
    //       Logout
    //     </button>
    //   )}
    // </ul>
  );
};

export default Header;
