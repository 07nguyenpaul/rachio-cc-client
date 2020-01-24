import React from 'react';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import ZoneTiles from './ZoneTiles';
import { configure, mount } from 'enzyme';

configure({ adapter: new Adapter() });

const defaultProps = {
  zone: {
    id: '82ee1a30-60a2-49a5-9f91-665b52ca52a5',
    zoneNumber: 1,
    name: 'Zone 1',
    enabled: true,
    customNozzle: {
      name: 'FIXED_SPRAY_HEAD',
      inchesPerHour: 3.81
    },
    customSoil: {
      name: 'LOAM'
    },
    customSlope: {
      name: 'ZERO_THREE',
      sortOrder: 0
    },
    customCrop: {
      name: 'Cool Season Grass',
      coefficient: 0.8
    },
    customShade: {
      name: 'LOTS_OF_SUN'
    },
    availableWater: 0.17,
    rootZoneDepth: 15.24,
    managementAllowedDepletion: 0.5,
    efficiency: 0.8,
    yardAreaSquareFeet: 46,
    imageUrl: 'https://prod-media-photo.rach.io/8107d244-1176-44a4-9a7e-d1de3b803f82',
    lastWateredDate: 1524750601000,
    scheduleDataModified: false,
    fixedRuntime: 0,
    wateringAdjustmentRuntimes: {
      '1': 2094,
      '2': 1745,
      '3': 1396,
      '4': 1047,
      '5': 698
    },
    saturatedDepthOfWater: 1.43,
    depthOfWater: 1.3,
    maxRuntime: 10800,
    runtimeNoMultiplier: 1396,
    runtime: 1396
  },
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  setMultiZone: jest.fn(),
}

describe('Component: ZoneTiles ', () => {
  it('should render zone tiles details', () => {
    const wrapper = mount(<ZoneTiles {...defaultProps} />);

    expect(wrapper.find('ExpandableTile').exists()).toBe(true);
    expect(wrapper.find('.zone__tile-name').render().text()).toBe('Zone 1');
    expect(wrapper.find('.zone__img').prop('src')).toBe('https://prod-media-photo.rach.io/8107d244-1176-44a4-9a7e-d1de3b803f82');

    expect(wrapper.find('.section-2').childAt(0).render().text()).toBe('Type of Crop: Cool Season Grass');
    expect(wrapper.find('.section-2').childAt(1).render().text()).toBe('Type of Nozzle: FIXED_SPRAY_HEAD');
    expect(wrapper.find('.section-2').childAt(2).render().text()).toBe('Amount of Shade: LOTS_OF_SUN');
    expect(wrapper.find('.section-2').childAt(3).render().text()).toBe('Soil: LOAM');

    expect(wrapper.find('.section-3').childAt(0).render().text()).toBe('Depth of Water: 1.3');
    expect(wrapper.find('.section-3').childAt(1).render().text()).toBe('Saturation Depth: 1.43');
    expect(wrapper.find('.section-3').childAt(2).render().text()).toBe('Efficiency: 0.8');
    expect(wrapper.find('.section-3').childAt(3).render().text()).toBe('Root Depth: 15.24');
    expect(wrapper.find('.section-3').childAt(4).render().text()).toBe('Yard Measurement (sqft): 46');
  });

  it('should change duration value and submit', () => {
    const wrapper = mount(<ZoneTiles {...defaultProps} />);

    expect(wrapper.find('.bx--number__input-wrapper input').instance().value).toBe('5');
    wrapper.find('.bx--number__input-wrapper input').simulate('change', { target: { value: '7' }});
    expect(wrapper.find('#zone__form--submit-btn')).toHaveLength(1);
    wrapper.find('#zone__form--submit-btn').simulate('click')
    expect(wrapper.find('.bx--number__input-wrapper input').instance().value).toBe('7');
  })
});
