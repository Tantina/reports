import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Alert } from 'react-bootstrap';
import 'react-dates/lib/css/_datepicker.css';

import { addReport, clearErrors } from '../../actions';
import ReportName from './fields/ReportName';
import ReportEmail from './fields/ReportEmail';
import ReportType from './fields/ReportType';
import ReportAccessGroups from './fields/ReportAccessGroups';
import ReportEmails from './fields/ReportEmails';
import ReportDateRange from './fields/ReportDateRange';
import { regexpReportName, regexpEmail } from '../../constants/Regexp';

const { string, func, object } = PropTypes;

class ReportForm extends Component {
  constructor(props) {
    super(props);

    let initialState = {
      name: '',
      emailTo: '',
      type: 'USER_AGREGATE_ACCESS',
      access: {
        guid: '',
        name: ''
      },
      emails: '',
      startDate: null,
      endDate: null
    };

    const { reports, location } = props;
    const id = Number(new URLSearchParams(location.search).get('id'));
    const existedReport = reports.all.find(report => report.id === id);

    if (id && existedReport) {
      const { name, emailTo, reportMetadata } = existedReport;
      const {
        reportType,
        accessGroupUUID,
        accessGroupName,
        userEmails,
        startDate,
        endDate
      } = reportMetadata;

      initialState = {
        name,
        emailTo,
        type: reportType,
        access: {
          guid: accessGroupUUID,
          name: accessGroupName
        },
        emails: userEmails.join(', '),
        startDate: startDate && moment(startDate),
        endDate: endDate && moment(endDate)
      };
    }

    this.state = initialState;
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleChangeName = (e) => {
    this.setState({
      name: e.currentTarget.value
    });
  }

  handleChangeEmail = (e) => {
    this.setState({
      emailTo: e.currentTarget.value
    });
  }

  handleChangeEmails = (e) => {
    this.setState({
      emails: e.currentTarget.value
    });
  }

  handleChangeType = (e) => {
    this.setState({
      type: e.currentTarget.value
    });
  }

  handleChangeGroup = (guid, name) => {
    this.setState({
      access: {
        guid,
        name
      }
    });
  }

  handleDateChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { addReport } = this.props;
    const { type, access, name, startDate, endDate, emailTo, emails } = this.state;
    const report = {
      type,
      access,
      name,
      emailTo,
      startDate: startDate && startDate.format('YYYY-MM-DDTHH:mm:ss'),
      endDate: endDate && endDate.format('YYYY-MM-DDTHH:mm:ss'),
      emails: emails ? emails.split(/[\s,]+/) : [] };
    addReport(report);
  }

  render() {
    const { type, name, emailTo, access, emails, startDate, endDate } = this.state;
    const { errorMessage } = this.props;

    const isValidName = !!name && regexpReportName.test(name);
    const isValidEmail = !!emailTo && regexpEmail.test(emailTo);
    const isValidEmails = !emails ? true : emails.split(/[\s,]+/).every(emailTo => (
      regexpEmail.test(emailTo.trim())
    ));
    const isValidAccessGroups = !!access.guid;
    const isValidForm = isValidName && isValidEmail && isValidEmails && isValidAccessGroups;

    const errorBlock = errorMessage ? <Alert bsStyle="danger">{errorMessage}</Alert> : null;

    return (
      <form onSubmit={this.handleSubmit}>
        <ReportName
          name={name}
          isValid={isValidName}
          onChange={this.handleChangeName}
        />

        <ReportType
          type={type}
          onChange={this.handleChangeType}
        />

        <ReportAccessGroups
          access={access}
          isValid={isValidAccessGroups}
          onChangeAccessGroups={(guid, name) => this.handleChangeGroup(guid, name)}
        />

        <ReportEmails
          emails={emails}
          isValid={isValidEmails}
          onChange={this.handleChangeEmails}
        />

        <ReportDateRange
          startDate={startDate}
          endDate={endDate}
          onChange={({ startDate, endDate }) => this.handleDateChange({ startDate, endDate })}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
        />

        <ReportEmail
          email={emailTo}
          isValid={isValidEmail}
          onChange={this.handleChangeEmail}
        />

        {errorBlock}

        <Button bsStyle="primary" type="submit" disabled={!isValidForm}>
          Submit
        </Button>
      </form>
    );
  }
}

ReportForm.propTypes = {
  addReport: func.isRequired,
  reports: object.isRequired,
  location: object.isRequired,
  clearErrors: func.isRequired,
  errorMessage: string.isRequired
};

function mapStateToProps(state) {
  return {
    reports: state.reports,
    errorMessage: state.errors
  };
}

export default connect(mapStateToProps, { addReport, clearErrors })(ReportForm);
