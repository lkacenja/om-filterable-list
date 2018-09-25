import { connect } from 'react-redux';
import { updatePager } from '../actions';
import Pager from '../components/pager';

const mapStateToProps = function(state, ownProps) {
  return {
    currentPage: state.pager.page,
    total: state.pager.total,
    values: state.filter.values,
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    handlePager: function() {
      // Trigger page increment
      dispatch(updatePager());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pager);
