import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

import { getReports } from '../../actions';

class ReportTableSettings extends Component {
  handleChangeCount(e) {
    const { getReports } = this.props;
    const limit = Number(e.currentTarget.value);
    getReports(1, limit);
  }

  render() {
    const { reports } = this.props;
    return (
      <div>
        <FormControl
          componentClass="select"
          placeholder="select"
          value={reports.limit}
          onChange={e => this.handleChangeCount(e)}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </FormControl>
      </div>
    );
  }
}

ReportTableSettings.propTypes = {
  reports: PropTypes.object.isRequired,
  getReports: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    reports: state.reports
  };
}

export default connect(mapStateToProps, { getReports })(ReportTableSettings);
