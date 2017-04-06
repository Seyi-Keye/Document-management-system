import React from 'react';
import { browserHistory, Link } from 'react-router'
import  Role from '../role/role';
import toastr from 'toastr';

class Roles extends React.Component {
  render() {
    return (
      <div>
        <h3>Everything about Roles</h3>
        <Role/>
      </div>
    )

  }
}
export default Roles;
