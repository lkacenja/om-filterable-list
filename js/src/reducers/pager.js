import assign from 'object-assign';
import actionTypes from '../utility/action-types';
import constants from '../utility/constants';

const defaultState = {
  page: 0,
  total: 0
};

export default function(state, action) {
  switch (action.type) {
    case actionTypes.REPLACE_ENTITIES:
      return assign({}, state, { total: parseInt(action.total, 10) });
    case actionTypes.UPDATE_PAGER: 
      return assign({}, state, { page: parseInt(action.currentPage, 10) });
    default:
      return assign({}, defaultState, state);
  }
}
