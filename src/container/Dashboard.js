import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'carbon-components-react'
import DeviceTiles from '../components/DeviceTiles';
// import { withRouter } from 'react-router';
import { Accordion, AccordionItem, AccordionSkeleton, ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from 'carbon-components-react'


import { getDevices } from '../actions/devices';

import '../styles/Dashboard.scss';


export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.dispatch(getDevices());
  }

  getDevices() {
    let deviceList = [];
    this.props.devices.map(device => {
      return deviceList.push(device.name)
    })

    return (
      <Dropdown
        ariaLabel="Dropdown"
        disabled={false}
        id="dashboard__dropdown--devices"
        items={deviceList}
        label="Select Device"
        itemToElement={null}
        itemToString={ item => { if (typeof item === 'string') { return item; } return item ? item : ''; }}
        onChange={function noRefCheck(){}}
        size={undefined}
        type="default"
      />
    )
  }

  renderZones(zones) {
    let displayZones = zones.map(zone => (
      <ExpandableTile
        className="zone-tile"
        key={zone.id}
      >
        <TileAboveTheFoldContent>
        {zone.name}
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
        <div
          className="zone-details__tile--details"
        >
          below the fold content here
        </div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    ));
    return displayZones;
  }

  renderDevices = () => {
    return this.props.devices.map(device => (
      <Accordion key={device.id}className="accordion--devices">
        <AccordionItem title={device.name} className="device-tile">
          {this.renderZones(device.zones)}
        </AccordionItem>
      </Accordion>
    ));
  }

  render() {
    return (
      <div className="dashboard">
        {this.getDevices()}
        {!this.props.devices ? (<AccordionSkeleton count={5} open/>) : this.renderDevices()}
      </div>
    )
  }
}

Dashboard.propTypes = {
};

function mapStateToProps(state) {
  return {
    devices: state.devices.devices,
  };
}

export default connect(mapStateToProps)(Dashboard);
