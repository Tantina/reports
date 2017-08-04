import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';

import { getReports } from '../../actions';

class ReportTableSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 10
    };
  }

  handleChangeCount(e) {
    const limit = Number(e.currentTarget.value);
    this.setState({
      limit
    });
    this.props.getReports(1, limit);
  }

  render() {
    return (
      <div>
        <FormControl
          componentClass="select"
          placeholder="select"
          value={this.state.limit}
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

export default connect(null, { getReports })(ReportTableSettings);
