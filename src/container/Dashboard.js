import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (

    )
  }
}

Dashboard.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default withRouter(connect(mapStateToProps)(Dashboard));
