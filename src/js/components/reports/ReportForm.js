import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import 'react-dates/lib/css/_datepicker.css';

import { addReport, getReport, clearErrors } from '../../actions';
import ReportName from './fields/ReportName';
import ReportEmail from './fields/ReportEmail';
import ReportType from './fields/ReportType';
import ReportAccessGroup from './fields/ReportAccessGroup';
import ReportEmails from './fields/ReportEmails';
import ReportDateRange from './fields/ReportDateRange';
import { regexpReportName, regexpEmail } from '../../constants/Regexp';


class ReportForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      type: 'aggregate-access',
      access: 'group1',
      emails: '',
      startDate: null,
      endDate: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getReport, location } = this.props;
    const id = new URLSearchParams(location.search).get('id');

    if (id) {
      getReport(id).then(() => {
        this.onMount();
      });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onMount() {
    const emails = this.props.newReport.emails.join(', ');
    this.setState((prevState, props) => (
      { ...props.newReport, emails }
    ));
  }

  handleChangeName(e) {
    this.setState({
      name: e.currentTarget.value
    });
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.currentTarget.value
    });
  }

  handleChangeEmails(e) {
    this.setState({
      emails: e.currentTarget.value
    });
  }

  handleChangeType(e) {
    this.setState({
      type: e.currentTarget.value
    });
  }

  handleChangeGroup(e) {
    this.setState({
      access: e.currentTarget.value
    });
  }

  handleDateChange({ startDate, endDate }) {
    this.setState({
      startDate,
      endDate
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addReport } = this.props;
    const { type, access, name, email, emails } = this.state;
    const report = { type, access, name, email, emails: emails.split(/[\s,]+/) };
    addReport(report);
  }

  render() {
    const { type, name, email, access, emails, startDate, endDate } = this.state;
    const { errorMessage } = this.props;


    const isValidName = !!name && regexpReportName.test(name);
    const isValidEmail = !!email && regexpEmail.test(email);
    const isValidEmails = !emails ? true : emails.split(/[\s,]+/).every(email => (
      regexpEmail.test(email.trim())
    ));
    const isValidForm = isValidName && isValidEmail && isValidEmails;

    const errorBlock = errorMessage ? <Alert bsStyle="danger">{errorMessage}</Alert> : null;

    return (
      <form onSubmit={this.handleSubmit}>
        <ReportName
          name={name}
          isValid={isValidName}
          onChange={e => this.handleChangeName(e)}
        />

        <ReportType
          type={type}
          onChange={e => this.handleChangeType(e)}
        />

        <ReportAccessGroup
          access={access}
          onChange={e => this.handleChangeGroup(e)}
        />

        <ReportEmails
          emails={emails}
          isValid={isValidEmails}
          onChange={e => this.handleChangeEmails(e)}
        />

        <ReportDateRange
          startDate={startDate}
          endDate={endDate}
          onChange={({ startDate, endDate }) => this.handleDateChange({ startDate, endDate })}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
        />

        <ReportEmail
          email={email}
          isValid={isValidEmail}
          onChange={e => this.handleChangeEmail(e)}
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
  addReport: PropTypes.func.isRequired,
  getReport: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  newReport: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    newReport: state.newReport,
    errorMessage: state.errors
  };
}

export default connect(mapStateToProps, { addReport, getReport, clearErrors })(ReportForm);
