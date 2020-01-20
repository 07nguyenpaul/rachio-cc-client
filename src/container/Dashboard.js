import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'carbon-components-react'
import DeviceTiles from '../components/DeviceTiles';
// import { withRouter } from 'react-router';
import { Accordion, AccordionItem, AccordionSkeleton, Button, ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent, Form, NumberInput } from 'carbon-components-react'


import { getDevices } from '../actions/devices';
import { setDuration } from '../actions/zones';

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

  lowerCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  handleSubmit = (e) => {
    console.log("HERE");
    e.preventDefault();
    this.props.dispatch(setDuration("7fed6a5e-f1d1-47ab-b78e-aa86167c2692", 1));
    // this.props.dispatch(setDuration([{id: "7fed6a5e-f1d1-47ab-b78e-aa86167c2692", duration: 100, sortOrder: 1}, {id: "d754bd7d-73f4-417e-93ab-f54c355b3352", duration: 100, sortOrder: 2} ]));
  }

  stopBubbling(event) {
    event.stopPropagation();
  }

  renderZones(zones) {
    let displayZones = zones.map(zone => (
      <ExpandableTile
        className="zone-tile"
        key={zone.id}
      >
        <TileAboveTheFoldContent>
          <div className="zone__tile--above">
            <div className="zone__tile-name">{zone.name}</div>
          </div>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
        <div
          className="zone-details__tile--details"
        >
          <img className="zone__img" src={zone.imageUrl} alt="Italian Trulli" />
          <div className="section-1">
            <div>ID: {zone.id}</div>
            <Form
              onSubmit={e => this.handleSubmit(e)}
              className="zone__form--duration"
            >
            <NumberInput
              className="some-class"
              id="number-input-1"
              label="Set Zone Timer (minutes): "
              max={180}
              min={0}
              step={1}
              value={5}
              onClick={(event) => this.stopBubbling(event)}
            />
              <button
              type="button"
              className="zone__form--submit-btn"
              onClick={e => this.handleSubmit(e)}
              >
              SUBMIT
              </button>
            </Form>

          </div>
          <div className="section-2">
            <div>Type of Crop: {zone.customCrop.name}</div>
            <div>Type of Nozzle: {zone.customNozzle.name}</div>
            <div>Amount of Shade: {zone.customShade.name}</div>
            <div>Soil: {zone.customSoil.name}</div>
          </div>
          <div className="section-3">
            <div>Depth of Water: {zone.depthOfWater}</div>
            <div>Saturation Depth: {zone.saturatedDepthOfWater}</div>
            <div>Efficiency: {zone.efficiency}</div>
            <div>Root Depth: {zone.rootZoneDepth}</div>
            <div>Yard Measurement (sqft): {zone.yardAreaSquareFeet}</div>
          </div>
          <div className="section-4">
          </div>
        </div>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    ));
    return displayZones;
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
