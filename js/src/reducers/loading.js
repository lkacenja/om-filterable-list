import actionTypes from '../utility/action-types';
import assign from 'object-assign';

var loading = false;

export default function(state, action) {
  switch(action.type) {
    case actionTypes.LOADING:
      return assign({}, state, {loading: action.isLoading});
    default:
      return assign({}, state, {loading: loading});
  }
}
