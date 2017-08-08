import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReportTable from './ReportTable';
import ReportPagination from './ReportPagination';
import ReportTableSettings from './ReportTableSettings';

import { getReports, removeReport, clearErrors } from '../../actions';


class ReportPage extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }
  render() {
    const { errorMessage } = this.props;
    return (
      <div className="reports-page">
        {errorMessage ? <Alert bsStyle="danger">{errorMessage}</Alert> : null}
        <LinkContainer className="create-report-btn" to="/new">
          <Button>Create</Button>
        </LinkContainer>
        <ReportTableSettings {...this.props} />
        <ReportTable {...this.props} />
        <ReportPagination {...this.props} />
      </div>
    );
  }
}

ReportPage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  clearErrors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    reports: state.reports,
    errorMessage: state.errors
  };
}

export default connect(mapStateToProps,
  { getReports, removeReport, clearErrors })(ReportPage);
