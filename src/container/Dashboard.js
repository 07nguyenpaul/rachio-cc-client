import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'carbon-components-react'
import ZoneTiles from '../components/ZoneTiles';
// import { withRouter } from 'react-router';
import { Accordion, AccordionItem, AccordionSkeleton, DropdownSkeleton, Modal } from 'carbon-components-react'


import { getDevices, getForcast } from '../actions/devices';
import { setDuration } from '../actions/zones';

import '../styles/Dashboard.scss';


export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      time: 5,
      zone: [],
      zoneName: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(getDevices());
  }

  getDevices = () => {
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
    this.setState({ openModal: !this.state.openModal, zoneName: zone.name });
    // this.props.dispatch(setDuration([{id: "7fed6a5e-f1d1-47ab-b78e-aa86167c2692", duration: 100, sortOrder: 1}, {id: "d754bd7d-73f4-417e-93ab-f54c355b3352", duration: 100, sortOrder: 2} ]));
  }

  handleChange = (e) => {
    const { value } = e.target;
    let convertToSecondValue = parseInt(value) * 60;

    this.setState({ time: convertToSecondValue });
  }

  renderZones = (zones) => {
    return zones.map(zone => (
      <ZoneTiles
        key={zone.id}
        zone={zone}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    ));
  }

  renderDevices = () => {
    return this.props.devices.map(device => (
      <Accordion key={device.id} className="accordion--devices">
        <AccordionItem title={device.name} className="device-tile">
          {this.renderZones(device.zones)}
        </AccordionItem>
      </Accordion>
    ));
  }

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  }

  render() {
    const { errorMessage, status } = this.props;
    const { time, zoneName } = this.state;
    const conversionToMintues = time === 5 ? time : time / 60;

    return (
      <div className="dashboard">
{/*        {!this.props.devices ? (<DropdownSkeleton inline={false}/>) : this.getDevices()}
*/}        {!this.props.devices ? (<AccordionSkeleton count={5} open/>) : this.renderDevices()}
        <Modal
          className="confirmation__modal"
          open={this.state.openModal}
          onClick={this.toggleModal}
          passiveModal={true}
          size="xs"
          modalHeading="Zone has been set!"
          modalLabel="Set Duration"
        >
          <p className="bx--modal-content__text">
            { status === 204
              ? `Zone: ${zoneName} has been set to ${conversionToMintues} minutes.`
              : status === '301'
              ? `Error: ${errorMessage}`
              : 'Sorry! Something went wrong. Please try setting zone again.'
            }
          </p>
        </Modal>
      </div>
    )
  }
}

Dashboard.propTypes = {
};

function mapStateToProps(state) {
  return {
    devices: state.devices.devices,
    status: state.zones.status,
    errorMessage: state.zones.error,
  };
}

export default connect(mapStateToProps)(Dashboard);
