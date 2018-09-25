import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import Select2 from 'react-select2-wrapper';

class FilterSelect extends Component {
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
      fkey = this.props.fkey,
      options = config.options.concat([{id: null, text: null}]),
      multiple = config.multiple === false ? false : true,
      widgetOptions = {multiple: multiple, placeholder: config.placeholder || ''};
      if (multiple == false) {
        widgetOptions.minimumResultsForSearch = -1;
      }
    var classes = ['select', fkey.replace('_', '-')];
    return (
     <span className={classes.join(' ')}>
       <div className="label">{config.label}</div>
       <Select2 data={ options } data-fkey={ fkey } options={ widgetOptions } value={ this.props.values[fkey] || [] } onChange={ this.handleChange } />
     </span>
    );
  }
  handleChange(e) {
    if (this.initialLoad == false) {
      this.props.onChange(e, this.props.values);
    }
    this.initialLoad = false;
  }
}

FilterSelect.propTypes = {
  fkey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
};

export default FilterSelect;
