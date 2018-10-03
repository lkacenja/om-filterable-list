import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

class FilterRadios extends Component {
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
    var options = [];
    for (var x in config.options) {
      var active = this.props.values[fkey] == config.options[x].id;
      options.push(<div className={ "radio-item-wrapper " + (active == true ? 'active' : '') } key={ fkey + config.options[x].id + "wrapper" }>
                     <input type="radio" id={ config.options[x].id } key={ fkey + config.options[x].id } data-fkey={ fkey } onChange={this.handleChange}
                        name={ fkey } value={ config.options[x].id } checked={ active } />
                     <label key={ fkey + config.options[x].id + "label" } htmlFor={ config.options[x].id }>{ config.options[x].text }</label>
                   </div>);
    }
    var classes = ['radios', fkey.replace('_', '-')];
    return (
     <span className={classes.join(' ')}>
       { config.label ? <div className="label">{ config.label }</div> : false }
       { options }
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

FilterRadios.propTypes = {
  fkey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
};

export default FilterRadios;
