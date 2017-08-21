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

const { string, func, object, bool } = PropTypes;

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

  handleChangeInput = key => (event) => {
    this.setState({
      [key]: event.currentTarget.value
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
    const { type, access, name, email, emails } = this.state;
    const report = { type, access, name, email, emails: emails ? emails.split(/[\s,]+/) : [] };
    addReport(report);
  }

  render() {
    const { type, name, email, access, emails, startDate, endDate } = this.state;
    const { errorMessage, loader } = this.props;


    const isValidName = !!name && regexpReportName.test(name);
    const isValidEmail = !!email && regexpEmail.test(email);
    const isValidEmails = !emails ? true : emails.split(/[\s,]+/).every(email => (
      regexpEmail.test(email.trim())
    ));
    const isValidForm = isValidName && isValidEmail && isValidEmails;

    const errorBlock = errorMessage ? <Alert bsStyle="danger">{errorMessage}</Alert> : null;

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset disabled={loader}>
          <ReportName
            name={name}
            isValid={isValidName}
            onChange={this.handleChangeInput('name')}
          />

          <ReportType
            type={type}
            onChange={this.handleChangeInput('type')}
          />

          <ReportAccessGroup
            access={access}
            onChange={this.handleChangeInput('access')}
          />

          <ReportEmails
            emails={emails}
            isValid={isValidEmails}
            onChange={this.handleChangeInput('emails')}
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
            onChange={this.handleChangeInput('email')}
          />

          {errorBlock}

          <Button bsStyle="primary" type="submit" disabled={!isValidForm}>
            {loader ? <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" /> : null }
            {loader ? 'Loading...' : 'Submit' }
          </Button>
        </fieldset>
      </form>
    );
  }
}

ReportForm.propTypes = {
  addReport: func.isRequired,
  getReport: func.isRequired,
  location: object.isRequired,
  loader: bool.isRequired,
  newReport: object.isRequired,
  clearErrors: func.isRequired,
  errorMessage: string.isRequired
};

function mapStateToProps(state) {
  return {
    newReport: state.newReport,
    errorMessage: state.errors,
    loader: state.loader
  };
}

export default connect(mapStateToProps, { addReport, getReport, clearErrors })(ReportForm);
