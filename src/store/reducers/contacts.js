import initialData from '../initialData';
import { ADD_CONTACT, EDIT_CONTACT } from '../action-types/contacts';

const contactsReducer = (state = initialData.contacts, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.id]: {
            ...action.payload,
            position: Object.keys(state.list).length + 1,
          }
        },
      };
    case EDIT_CONTACT:
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default contactsReducer;