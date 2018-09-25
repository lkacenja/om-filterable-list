import React from 'react';
import { connect } from 'react-redux';
import { getContent, getNextContent, initializeFilters, updateFilters, updatePager } from '../actions';
import App from '../components/app';
import Filters from './filter-container';
import Pager from './pager-container';
import Preloader from '../components/preloader';

const mapStateToProps = function(state, ownProps) {
  return {
    entities: state.content.entities,
    tableHeaders: state.content.tableHeaders,
    loading: state.loading.loading,
    values: state.filter.values,
    defaultValues: state.filter.defaultValues,
    currentPage: state.pager.page,
    filters: <Filters />,
    pager: <Pager />, 
    preloader: state.loading.loading == true ? <Preloader key="preloader" /> : false
  };
}

export default connect(mapStateToProps, { getContent, updateFilters, initializeFilters, getNextContent, updatePager })(App);
