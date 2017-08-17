import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

const { func } = PropTypes;

class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null
    });
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}

Bundle.propTypes = {
  children: func.isRequired,
  load: func.isRequired
};

export default Bundle;
