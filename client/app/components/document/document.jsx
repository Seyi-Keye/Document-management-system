import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

class About extends React.Component {
   render() {
      return (
      <div className="container">
        <div className="row">
        <div className="col s12">
          <div className="card blue-grey darken-1">
            <div className="card-action grey">
              <button href="#"><i className="material-icons">save</i>Save</button>
              <button href="#"><i className="material-icons">save</i>Delete</button>
            </div>
            <div className="card-content black-text">
              <label className="card-title">
                Title<input className="docTitle s7"
                placeholder="Title Goes here"/></label>
              <div className="docContent">
                <textarea placeholder="Write Something"></textarea>
              </div>
            </div>
            <div className="card-action">
              <button href="#"><i className="material-icons">save</i>Save</button>
              <button href="#"><i className="material-icons">save</i>Delete</button>
            </div>
          </div>
        </div>
      </div>
        <a href="#!" className="waves-effect waves-circle waves-lightbtn-floating secondary-content"><i className="material-icons">note_add</i></a>
      </div>
      )
   }
}

export default About;
