import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import assign from 'object-assign';
import constants from '../utility/constants';
import Filter from '../components/filter';
import FilterSelect from '../components/filter-select';
import FilterSearch from '../components/filter-search';
import FilterDate from '../components/filter-date';

const factoryChildren = function(config, values, changeHandler) {
  var elements = [];
  for (var x in config) {
    switch(config[x].type) {
      case 'select':
        elements.push(factorySelect(config[x], values, x, changeHandler));
        break;
      case 'date':
        elements.push(factoryDate(config[x], values, x, changeHandler));
        break;
      case 'search':
        elements.push(factorySearch(config[x], values, x, changeHandler));
        break;
    }
  }
  return elements;
}

const factorySelect = function(config, values, key, changeHandler) {
  return <FilterSelect key={key} fkey={key} config={config} values={values} onChange={changeHandler} />
}

const factorySearch = function(config, values, key, changeHandler) {
  return <FilterSearch key={key} fkey={key} config={config} values={values} onChange={changeHandler} />;  
}

const factoryDate = function(config, values, key, changeHandler) {
  return <FilterDate key={key} fkey={key} config={config} values={values} onChange={changeHandler} />;
}


const getElementValue = function(element) {
  var value;
  if (element.type == 'select' || element.type == 'select-multiple') {
    value = getSelectValues(element);
  }
  else {
    value = element.value;
  }
  return value;
}

const getSelectValues = function(select) {
  var result = [];
  var options = select && select.options;
  var opt;
  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];
    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

const mapStateToProps = function(state, ownProps) {
  return {
    config: state.filter.config,
    values: state.filter.values,
    factoryChildren: factoryChildren
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    handleChange: function(e, values) {
      var fkey = e.target.getAttribute('data-fkey'),
        value = getElementValue(e.target),
        newValue = {};
        newValue[fkey] = value;
      var newValues = assign({}, values, newValue);
      if (!value || value.length == 0) {
        delete newValues[fkey];
      }
      var json = JSON.stringify(newValues);
      if (json != '{}') {
        dispatch(push(constants.BASE_PATH + '/' +  json + '/'));
      }
      else if (window.location.pathname != constants.BASE_PATH) {
        dispatch(push(constants.BASE_PATH + '/'));
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
