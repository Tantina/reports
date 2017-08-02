import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import 'react-dates/lib/css/_datepicker.css';

import { addReport, getReport } from '../../actions';
import ReportName from './fields/ReportName';
import ReportEmail from './fields/ReportEmail';
import ReportType from './fields/ReportType';
import ReportAccessGroup from './fields/ReportAccessGroup';
import ReportEmails from './fields/ReportEmails';
import ReportDateRange from './fields/ReportDateRange';

const dateFormat = 'YYYY-MM-DD';

class ReportForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      type: 'aggregate-access',
      access: 'group1',
      emails: [],
      startDate: null,
      endDate: null,
      startDateString: '',
      endDateString: '',
      formErrors: {
        name: {
          isValid: true,
          errorText: ''
        },
        email: {
          isValid: true,
          errorText: ''
        },
        emails: {
          isValid: true,
          errorText: ''
        }
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getReport, match } = this.props;

    if (match.params.id) {
      getReport(match.params.id);
      setTimeout(() => {
        this.onMount();
      }, 200);
    }
  }

  onMount() {
    this.setState((prevState, props) => (
      props.newReport
    ));
  //  this.validateField('name', this.props.newReport.name);
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
    const value = e.currentTarget.value;
    let emails = [];

    if (value.indexOf(',') > -1) {
      emails = value.split(',');
    } else if (value.indexOf('\n') > -1) {
      emails = value.split('\n');
    } else {
      emails = [value];
    }

    emails = emails.map(email => email.trim());

    this.setState({
      emails
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
      endDate,
      startDateString: startDate && startDate.format(dateFormat),
      endDateString: endDate && endDate.format(dateFormat)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addReport } = this.props;
    const { type, access, name, email, emails } = this.state;
    const report = { type, access, name, email, emails };
    addReport(report);
  }

  render() {
    const { type, name, email, access, emails, startDate, endDate, formErrors } = this.state;
    const isValidForm = formErrors.emails.isValid &&
      formErrors.email.isValid && formErrors.name.isValid;
    return (
      <form onSubmit={this.handleSubmit}>
        <ReportName
          name={name}
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
          onChange={e => this.handleChangeEmail(e)}
        />

        <Button bsStyle="primary" type="submit" disabled={!isValidForm}>
          Submit
        </Button>
      </form>
    );
  }
}

ReportForm.propTypes = {
  addReport: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    newReport: state.newReport
  };
}

export default connect(mapStateToProps, { addReport, getReport })(ReportForm);
