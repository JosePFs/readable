import { capitalize } from '../utils/helpers';

import {
  RECEIVE_CATEGORIES,
  SELECT_CATEGORY
} from '../actions/types';

function category (state = {categories: [], selected: ''}, action) {
  const { categories, category } = action;

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
      return {
        ...state,
        selected: category
      };
    default :
      return state;
  }
}

export default category;