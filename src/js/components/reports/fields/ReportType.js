import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, Radio } from 'react-bootstrap';

import { getReportTypes } from '../../../actions';

class ReportType extends Component {
  componentDidMount() {
    const { getReportTypes, reportTypes } = this.props;
    if (!reportTypes.length) getReportTypes();
  }
  render() {
    const { type, reportTypes, onChange } = this.props;
    return (
      <FormGroup controlId="formControlsRadio">
        <ControlLabel>Report Type</ControlLabel>
        {reportTypes.map(reportType => (
          <Radio
            key={reportType.type}
            name="radioGroup"
            value={reportType.type}
            checked={type === reportType.type}
            onChange={onChange}
          >
            {reportType.name}
          </Radio>
        ))
        }
      </FormGroup>
    );
  }
}


ReportType.propTypes = {
  type: PropTypes.string.isRequired,
  reportTypes: PropTypes.array.isRequired,
  getReportTypes: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    reportTypes: state.reportTypes
  };
}

export default connect(mapStateToProps, { getReportTypes })(ReportType);
