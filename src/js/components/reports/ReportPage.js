import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReportTable from './ReportTable';
import ReportPagination from './ReportPagination';
import ReportTableSettings from './ReportTableSettings';
import ReportSearch from './ReportSearch';
import Loader from '../common/Loader';

import { getReports, clearErrors } from '../../actions';

const { string, func, bool } = PropTypes;

class ReportPage extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }
  render() {
    const { errorMessage, loader } = this.props;
    return (
      <div className="reports-page">
        {loader ? <Loader /> : null}
        {errorMessage ? <Alert bsStyle="danger">{errorMessage}</Alert> : null}
        <LinkContainer className="create-report-btn" to="/new">
          <Button>Create</Button>
        </LinkContainer>
        <ReportSearch {...this.props} />
        <ReportTableSettings {...this.props} />
        <ReportTable {...this.props} />
        <ReportPagination {...this.props} />
      </div>
    );
  }
}

ReportPage.propTypes = {
  errorMessage: string.isRequired,
  clearErrors: func.isRequired,
  loader: bool.isRequired
};

function mapStateToProps(state) {
  return {
    reports: state.reports,
    errorMessage: state.errors,
    loader: state.loader
  };
}

export default connect(mapStateToProps,
  { getReports, clearErrors })(ReportPage);
