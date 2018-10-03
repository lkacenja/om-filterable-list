import React, { Component } from 'react';
import PropTypes from 'prop-types';
import constants from '../utility/constants';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const setContent = function(entities) {
  return {
    __html: entities
  }
}

class App extends Component {
  componentDidMount() {
    this.issueInitialActions();
  }
  componentDidUpdate(prevProps, prevState) {
    var currentValues = JSON.stringify(this.props.values),
      stringDefaults = JSON.stringify(this.props.defaultValues),
      urlValues = this.props.params.filterValues ? this.props.params.filterValues : '{}';
    if (JSON.stringify(prevProps.values) != stringDefaults && currentValues == stringDefaults) {
      urlValues = stringDefaults;
    }
    if (currentValues != urlValues) {
      this.issueActions();
    }
    if (this.props.params.currentPage && this.props.params.currentPage != prevProps.params.currentPage) {
      this.props.getNextContent(this.props.params.filterValues || "{}", this.props.params.currentPage);
      this.props.updatePager(this.props.params.currentPage);
    }
  }
  render() {
    var classes = ['list-inner'];
    if (this.props.loading) {
      classes.push('loading');
    }
    var entities = [];
    if (this.props.entities.length > 0) {
      for (var x in this.props.entities) {
        entities.push(<div key={x} className="item col col-50" dangerouslySetInnerHTML={setContent(this.props.entities[x])} />);
      }
    }
    return (
      <div className={classes.join(' ')}>
        { this.props.filters }
        <ReactCSSTransitionGroup transitionName="preloader" transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 300 } >
          { this.props.preloader }
        </ReactCSSTransitionGroup>
        <div className="content clearfix">
          <ReactCSSTransitionGroup transitionName="content" transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 300 } >
            { entities.length > 0 ?
              entities :
              <div className="empty" key="empty">{ constants.EMPTY_TEXT }</div> }
          </ReactCSSTransitionGroup>
        </div>
        { this.props.pager }
      </div>
    );
  }
  issueInitialActions() {
    var filterValues = !this.props.params.filterValues || this.props.params.filterValues == "{}" ? JSON.stringify(this.props.defaultValues) : this.props.params.filterValues; 
    if (filterValues == '{}') {
      this.props.getContent('{}', this.props.params.currentPage || 0);
    }
    else {
      this.props.push(constants.BASE_PATH + '/' + filterValues + '/');   
    }
  }
  issueActions() {
    this.props.updateFilters(this.props.params.filterValues || "{}");
    var currentPage = this.props.params.currentPage || 0;
    this.props.updatePager(currentPage);
    this.props.getContent(this.props.params.filterValues, currentPage);
  }
}

App.propTypes = {
  entities: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  values: PropTypes.object.isRequired,
  defaultValues: PropTypes.object.isRequired,
  initializeFilters: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired,
  getNextContent: PropTypes.func.isRequired,
  updateFilters: PropTypes.func.isRequired,
  filters: PropTypes.element.isRequired,
  pager: PropTypes.element.isRequired
};

export default App;
