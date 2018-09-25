import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; 
import DatePicker from 'react-datepicker';
import Moment from 'moment';

const DATE_DISPLAY_FORMAT = "YYYY-M-D";

class FilterDate extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.initialLoad = true;
  }
  shouldComponentUpdate(nextProps, nextState) {
    var fkey = this.props.fkey;
    if (this.initialLoad == true) {
      this.initialLoad = false;
    }
    if (this.props.values[fkey] != nextProps.values[fkey]) {
      return true;
    }
    return false;
  }
  render() {
    var config = this.props.config,
      fkey = this.props.fkey;
    var value = false;
    if (this.props.values[fkey]) {
      value = Moment(this.props.values[fkey], DATE_DISPLAY_FORMAT); 
    }
    var classes = ['date-picker', fkey.replace('_', '-')];
    return (
     <span data-fkey={fkey} className={classes.join(' ')}>
       <div className="label">{config.label}</div>
       <DatePicker dateFormat={DATE_DISPLAY_FORMAT} selected={value} onChange={ this.handleChange } placeholderText={config.placeholder || ''} />
     </span>
    );
  }
  handleChange(date) {
    var node = ReactDOM.findDOMNode(this); 
    if (date) {
      node.value = date.format(DATE_DISPLAY_FORMAT); 
    }
    else {
      node.value = null;
    }
    if (this.initialLoad == false) {
      this.props.onChange({target: node}, this.props.values);
    }
    this.initialLoad = false;
  }
}

FilterDate.propTypes = {
  fkey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
};

export default FilterDate;
