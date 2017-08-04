import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { getReports } from '../../actions';

class ReportPagination extends Component {
  constructor(props) {
    super(props);

    const query = new URLSearchParams(props.location.search);
    const page = Number(query.get('page'));
    this.state = {
      activePage: page
    };
  }

  handleSelect(eventKey) {
    const { reports, getReports } = this.props;
    this.setState({
      activePage: eventKey
    });
    getReports(eventKey, reports.limit);
  }

  render() {
    const { reports } = this.props;
    const numOfPages = Math.ceil(reports.count / reports.limit);
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={numOfPages}
        activePage={this.state.activePage}
        onSelect={e => this.handleSelect(e)}
      />
    );
  }
}

ReportPagination.propTypes = {
  location: PropTypes.object.isRequired,
  getReports: PropTypes.func.isRequired,
  reports: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {
    reports: state.reports
  };
}

export default connect(mapStateToProps, { getReports })(ReportPagination);
