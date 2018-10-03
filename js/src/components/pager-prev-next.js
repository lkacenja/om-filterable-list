import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import constants from '../utility/constants';

class Pager extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    var pagerLinks = [],
      classes = ['pager'];
    if (this.props.total > 0) {
      var href,
        prevClasses = ['pager-control', 'pager-previous'],
        nextClasses = ['pager-control', 'pager-next'],
        totalPages = Math.ceil(this.props.total / constants.ITEMS_PER_PAGE),
        from = ((this.props.currentPage + 1) * constants.ITEMS_PER_PAGE) - (constants.ITEMS_PER_PAGE - 1),
        to = (this.props.currentPage + 1) * constants.ITEMS_PER_PAGE,
        of = this.props.total;
        to = to > this.props.total ? this.props.total : to;
      if (totalPages > 1) {
        pagerLinks.push(<div key='explainer'>{ from } - { to } of { of }</div>); 
        if ((this.props.currentPage - 1) < 0) {
          prevClasses.push('disabled');
        }
        href = constants.BASE_PATH + '/' + JSON.stringify(this.props.values) + '/' + (this.props.currentPage - 1) + '/';
        pagerLinks.push(<Link key='pager-previous' className={prevClasses.join(' ')} to={ href }>{ constants.PAGER_PREVIOUS }</Link>);
        if ((this.props.currentPage + 1) >= totalPages) {
          nextClasses.push('disabled');
        }
        href = constants.BASE_PATH + '/' + JSON.stringify(this.props.values) + '/' + (this.props.currentPage + 1);
        pagerLinks.push(<Link key='pager-next' className={nextClasses.join(' ')} to={ href }>{ constants.PAGER_NEXT }</Link>);
      }
    }
    return (
      <div className={ classes.join(' ') }>
        { pagerLinks }
      </div>
    );
  }
  handleClick(e) {
    e.preventDefault();
    if ((this.props.currentPage + 1) < totalPages) {
      this.props.handlePager();
    } 
  }
}

export default Pager;
