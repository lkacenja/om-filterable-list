import assign from 'object-assign';
import { filters } from 'config';
import actionTypes from '../utility/action-types';

const defaultState = {
  config: filters,
  values: {},
  defaultValues: {},
  initialized: false
};

for (var x in filters) {
  if (filters[x].default_value) {
    defaultState.defaultValues[x] = filters[x].default_value;
  }
}

//defaultState.defaultValues = defaultState.values;

export default function(state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_FILTERS:
      const newValues = assign({}, JSON.parse(action.values));
      return assign({}, state, {values: newValues});
    default:
      return assign({}, defaultState, state);
  }
}
