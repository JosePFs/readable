import { combineReducers } from 'redux';
import { capitalize } from '../utils/helpers';

import {
  RECEIVE_CATEGORIES,
  SELECT_CATEGORY
} from '../actions'

function categories (state = {categories: [], selected: ''}, action) {
  const { categories } = action;

  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const optionsCategoryFormated = categories.map((category) => (
        {value: category.path, label: capitalize(category.name)}));
      optionsCategoryFormated.unshift({value: 'all', label: 'All'});
      return {
        ...state,
        categories: optionsCategoryFormated,
        selected: optionsCategoryFormated[0]
      };
    case SELECT_CATEGORY:
      const { category } = action;
      return {
        ...state,
        selected: category
      };
    default :
      return state;
  }
}

function posts (state = {}, action) {
  switch (action.type) {
    default :
      return state;
  }
}

function comments (state = {}, action) {
  switch (action.type) {
    default :
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
})