import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    var children = this.props.factoryChildren(this.props.config, this.props.values, this.props.handleChange);
    return (<div className="filters clearfix">{ children }</div>);
  }
}

Filter.propTypes = {
  factoryChildren: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
};

export default Filter;
