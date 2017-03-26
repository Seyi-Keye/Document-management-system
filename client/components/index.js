import React from 'react';
import {render} from 'react-dom';
import { SignUp } from './SignUp';

class App extends React.Component {
  render () {
    return <SignUp/>;
  }
}

render(<App/>, document.getElementById('app'));
