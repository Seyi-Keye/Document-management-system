import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'
import { Form, Input, Button, Row, Col, Icon } from 'react-materialize';

import toastr from 'toastr';

class App extends React.Component {
  constructor(props){
    super(props);
     this.state = {
      searchInput: ''
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    browserHistory.push(`/search?query=${this.state.searchInput}`);
  }

  handleSearchChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogout(e) {
    localStorage.removeItem('token');
    toastr.success('You have been Logged Out');
    browserHistory.push('/login');
  }

  renderNavBar() {
    const token = localStorage.getItem('token');
      return (
        <nav>
          <div className="nav-wrapper cyan accent-4 z-depth-3">
             <ul>
              { token &&  <li> <Link to="/dashboard/document">Create Document </Link> </li> }
              { !token && <li> <Link to="/signup"> Sign Up </Link></li> }
              { !token && <li> <Link to="/login"> Login </Link></li> }
              { token &&  <li> <Link to="/dashboard"> Dashboard</Link></li>}
              { token &&  <li> <Link to="/users"> Users</Link></li>}
              { token && <li> <Link to="/roles"> Manage Role</Link></li>}
              { token &&  <li>
                 <form onSubmit={this.handleSearchSubmit}>
                    <div className="input-field">
                      <Input
                       placeholder="Search Here"
                       id="search"
                       onChange={this.handleSearchChange}
                       type="text"
                       required
                       name="searchInput"
                       value={this.state.searchInput}
                       label={<i className="material-icons">search</i>} />
                      <i className="material-icons">close</i>
                    </div>
                  </form>
                </li>}
              { token &&  <button id={this.handleLogout} onClick={this.handleLogout}>Logout</button>}

              </ul>
          </div>
        </nav>
      );
    }

    render() {
      return (
        <div>
        {this.renderNavBar()}
        {this.props.children}
        </div>
      )
  }
}

const stateToProps = (state) => {
 return {
   user: state.user
  };
};

const dispatchToProps = (dispatch) => ({
//   return {
//   const searchDocsAction = searchDocResults => ({
//   type: 'SEARCHDOCS_ACTION',
//   searchDocResults
//   });
// const searchDocsHelper = (docTitle) => {
//   token = window.localStorage.getItem('jwtToken');
//   return (dispatch) => {
//     return request.get(`/api/v1/search/documents?q=${docTitle}`)
//     .set({ Authorization: token })
//     .send(docTitle)
//     .then((res) => {
//       if (res.status === 200) {
//         dispatch(searchDocsAction(res.body.msg));
//       } else {
//       }
//     });
//   };
// };

  });

export default connect(stateToProps, dispatchToProps) (App);
