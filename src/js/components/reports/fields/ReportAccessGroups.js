import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import { host } from '../../../constants/host';

const { object, bool, func } = PropTypes;

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <a>{suggestion.name}</a>
);

class ReportAccessGroups extends Component {
  constructor(props) {
    super(props);

    const group = props.access;

    this.state = {
      value: group.name,
      guid: group.guid,
      suggestions: []
    };
  }

  onSuggestionsFetchRequested = ({ value }) => {
    if (!value) {
      return;
    }
    const limit = 10;
    axios.get(`${host}/accessgroup?name=${value}&limit=${limit}`)
      .then(result => this.setState({ suggestions: result.data })
      );
  }

  onChange = (event, { newValue }) => {
    const { suggestions } = this.state;
    const group = suggestions.find(suggestion => suggestion.name === newValue);
    const guid = group ? group.guid : '';
    this.setState({
      value: newValue,
      guid
    });
    this.props.onChangeAccessGroups(guid, newValue);
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }

  render() {
    const { value, suggestions } = this.state;
    const { isValid } = this.props;

    const inputProps = {
      placeholder: 'Type an access group',
      value,
      onChange: this.onChange,
      onBlur: this.onBlur
    };

    const theme = {
      container: 'autosuggest dropdown',
      input: 'form-control',
      suggestionsContainer: 'dropdown',
      suggestionsContainerOpen: 'dropdown open',
      suggestionHighlighted: 'active',
      suggestionsList: 'dropdown-menu',
      suggestion: 'dropdown-item',
    };

    return (
      <FormGroup controlId="formControlsSelect" validationState={isValid ? null : 'error'}>
        <ControlLabel>Access Group<sup>*</sup></ControlLabel>
        <Autosuggest
          theme={theme}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </FormGroup>
    );
  }
}

ReportAccessGroups.propTypes = {
  access: object.isRequired,
  isValid: bool.isRequired,
  onChangeAccessGroups: func.isRequired
};

export default ReportAccessGroups;
