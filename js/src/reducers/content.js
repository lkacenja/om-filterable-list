import assign from 'object-assign';
import actionTypes from '../utility/action-types';
import { tableHeaders } from 'config';

const defaultState = {
  tableHeaders: tableHeaders,
  entities: []
};

export default function(state, action) {
  switch (action.type) {
    case actionTypes.ADD_ENTITIES:
      var newEntities = state.entities.concat(action.entities);
      return assign({}, state, { entities: newEntities });
    case actionTypes.REPLACE_ENTITIES: 
      return assign({}, state, { entities: action.entities || [] });
    default:
      return assign({}, defaultState, state);
  }
}
