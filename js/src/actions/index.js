import jQuery from 'jquery';
import constants from '../utility/constants';
import actionTypes from '../utility/action-types';

export const getContent = function(filters, page) {
  return function(dispatch, getState) {
    var url = constants.CONTENT_ENDPOINT;
    var data = filters ? JSON.parse(filters) : {};
    data.page = page || 0;
    dispatch(setLoading(true));
    jQuery.ajax({
      url: url,
      data: data,
      dataType: 'json',
      success: function(data) {
        dispatch(receiveContent(data));
        dispatch(setLoading(false));
      }
    });
  }
}

const receiveContent = function(data) {
  return {
    type: actionTypes.REPLACE_ENTITIES,
    entities: data.result,
    total: data.total
  }
}

export const getNextContent = function(filters, page) {
  return function(dispatch, getState) {
    var url = constants.CONTENT_ENDPOINT;
    var data = filters ? JSON.parse(filters) : {};
    data.page = page || 0;
    data.source = constants.BASE_PATH;
    jQuery.ajax({
      url: url,
      data: data,
      dataType: 'json',
      success: function(data) {
        dispatch(receiveNextContent(data));
      }
    });
  }
}

const receiveNextContent = function(data) {
  return {
    type: actionTypes.REPLACE_ENTITIES,
    entities: data.result,
    total: data.total
  }
}

export const updateFilters = function(values, useDefaults)  {
  return function(dispatch, getState) {
    dispatch({
      type: actionTypes.UPDATE_FILTERS,
      values: values
    });
  }
}


export const initializeFilters = function() {
  return {
    type: actionTypes.INITIALIZE_FILTERS
  }
}

export const updatePager = function(page) {
  return {
    type: actionTypes.UPDATE_PAGER,
    currentPage: page
  };
}

export const setLoading = function(isLoading) {
  return {
    type: actionTypes.LOADING,
    isLoading: isLoading 
  }
}
