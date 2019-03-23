import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { Icon, IconTypes } from './';

describe('Icon Component', () => {
  it('should render icon with default type correctly', () => {
    const icon = renderer.create(<Icon name='add' />);
    expect(icon).toMatchSnapshot();
  });

  it('should render icon of type antIcon correctly', () => {
    const icon = renderer.create(<Icon type={IconTypes.ant} name='forward' />);
    expect(icon).toMatchSnapshot();
  });

  it('should be able to change icon color', () => {
    const props = {
      type: IconTypes.ant,
      name: 'forward',
      color: '#888888'
    };

    const icon = shallow(<Icon {...props} />);
    expect(icon.prop('color')).toEqual(props.color);
  });

  it('should be able to change the icon size', () => {
    const props = {
      name: 'add',
      size: 50
    };

    const icon = shallow(<Icon {...props} />);
    expect(icon.prop('size')).toEqual(props.size);
  });

  it('should be able to add custom valid style', () => {
    const props = {
      name: 'add',
      style: {
        elevation: 4,
        opacity: 0.8,
        marginVertical: 10
      }
    };

    const icon = shallow(<Icon {...props} />);
    expect(icon.prop('style')).toEqual(props.style);
  });
});
