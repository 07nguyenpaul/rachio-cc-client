import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'carbon-components-react'
import ZoneTiles from '../components/ZoneTiles';
import { Accordion, AccordionItem, AccordionSkeleton, Modal } from 'carbon-components-react'


import { getDevices, getForcast } from '../actions/devices';
import { setDuration } from '../actions/zones';

import '../styles/Dashboard.scss';


export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      time: 5,
      zones: [],
      zoneName: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getDevices();
  }

  handleSubmit(e, zone) {
    e.preventDefault();
    this.props.setDuration(zone.id, this.state.time);
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
          <h3 className="dashboard--zone-title">Zones</h3>
          {this.renderZones(device.zones)}
        </AccordionItem>
      </Accordion>
    ));
  }

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  }

  render() {
    const { errorMessage, status, loading } = this.props;
    const { time, zoneName } = this.state;
    const conversionToMintues = time === 5 ? time : time / 60;

    return (
      <div className="dashboard">
        <h1 className="dashboard--device-title">Devices</h1>
        {loading ? (<AccordionSkeleton count={5} open/>) : this.renderDevices()}
        <Modal
          className="confirmation__modal"
          open={this.state.openModal}
          onClick={this.toggleModal}
          passiveModal={true}
          size="xs"
          modalHeading={status === '301' ? 'Zone has not been set!' : 'Zone has been set!'}
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
    loading: state.devices.requesting,
  };
}

const mapDispatchToProps = {
  getDevices,
  setDuration
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
