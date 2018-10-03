import React, { Component, PropTypes } from 'react';
import constants from '../utility/constants';

class Pager extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    var classes = ['pager'];
    if (this.props.currentPage + 1 >= this.props.totalPages) {
      classes.push('pager-none');
    }
    var href = constants.BASE_PATH + '?page=' + (this.props.currentPage + 1);
    return (
      <div className={ classes.join(' ') }>
        <a href={href} className="button button-blue" onClick={ this.handleClick }>{ constants.PAGER_TEXT }</a>
      </div>
    );
  }
  handleClick(e) {
    e.preventDefault();
    if ((this.props.currentPage + 1) < this.props.totalPages) {
      this.props.handlePager();
    } 
  }
}

export default Pager;
