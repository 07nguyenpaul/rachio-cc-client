import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'carbon-components-react'
import ZoneTiles from '../components/ZoneTiles';
// import { withRouter } from 'react-router';
import { Accordion, AccordionItem, AccordionSkeleton, DropdownSkeleton } from 'carbon-components-react'


import { getDevices } from '../actions/devices';
import { setDuration } from '../actions/zones';

import '../styles/Dashboard.scss';


export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 5,
      zone: [],
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

  handleSubmit = (e, zone) => {
    e.preventDefault();
    this.props.dispatch(setDuration(zone.id, this.state.time));
    // this.props.dispatch(setDuration([{id: "7fed6a5e-f1d1-47ab-b78e-aa86167c2692", duration: 100, sortOrder: 1}, {id: "d754bd7d-73f4-417e-93ab-f54c355b3352", duration: 100, sortOrder: 2} ]));
  }

  handleChange = (e) => {
    const { value } = e.target;
    let convertToSecondValue = parseInt(value) * 60;

    this.setState({ time: convertToSecondValue });
  }

  renderZones(zones) {
    return zones.map(zone => (
      <ZoneTiles
        key={zone.id}
        id={zone.id}
        zone={zone}
        handleChange={this.handleChange}
        stopBubbling={this.stopBubbling}
        handleSubmit={this.handleSubmit}
      />
    ));
  }

  renderDevices() {
    return this.props.devices.map(device => (
      <Accordion key={device.id} className="accordion--devices">
        <AccordionItem title={device.name} className="device-tile">
          {this.renderZones(device.zones)}
        </AccordionItem>
      </Accordion>
    ));
  }

  render() {
    return (
      <div className="dashboard">
{/*        {!this.props.devices ? (<DropdownSkeleton inline={false}/>) : this.getDevices()}
*/}        {!this.props.devices ? (<AccordionSkeleton count={5} open/>) : this.renderDevices()}
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
