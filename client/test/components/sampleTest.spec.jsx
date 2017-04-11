import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

export default class Sample extends React.Component {
  constructor() {
    super();
    this.checkTest = this
      .checkTest
      .bind(this);
  }
  checkTest() {
    console.log('sample test button', this.props);
  }
  render() {
    return (
      <div>
        <p className="home">This is a sample Component</p>
        <button onClick={this.checkTest}>
          Test Button
        </button>
      </div>
    );
  }
}
describe('Sample Test case', () => {
  it('should have a component', () => {
    const wrapper = shallow(<Sample />);
    expect(wrapper.text())
      .to
      .equal('This is a sample Component Test Button ');
  });
});
