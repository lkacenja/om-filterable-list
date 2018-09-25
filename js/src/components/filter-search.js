import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {value: false};
  }
  render() {
    var urlValue = this.props.values[this.props.fkey],
      value = urlValue && this.state.value === false ? urlValue : this.state.value || '';
    return (
     <div className="search">
       <div className="label">{this.props.config.label}</div>
       <input type="text" className="text" placeholder={ this.props.config.placeholder || '' } data-fkey={this.props.fkey} ref="search" value={value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
       <input type="button" className="submit" value="Go" onClick={ this.handleSubmit } /> 
     </div>
    );
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  handleKeyDown(e) {
    if (e.keyCode == 13) {
      this.handleSubmit(e);
    }
  }
  handleSubmit(e) {
    this.props.onChange({target: this.refs.search}, this.props.values);
  }
}

Filter.propTypes = {
  fkey:  PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
};

export default Filter;
