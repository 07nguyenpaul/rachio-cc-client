import React from 'react';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Container: App ', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists()).toBe(true);
  });
});
