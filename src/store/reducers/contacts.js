import initialData from '../initialData';
import { ADD_CONTACT, EDIT_CONTACT, REORDER_LIST } from '../action-types/contacts';

const contactsReducer = (state = initialData.contacts, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        list: state.list.concat([
          {
            ...action.payload.data,
            position: state.list.length + 1,
          }
        ]),
      };
    case EDIT_CONTACT: {
      const index = state.list.findIndex(item => action.payload.data.id === item.id);

      return {
        ...state,
        list: index > -1
          ?
          [
            ...state.list.slice(0, index),
            action.payload.data,
            ...state.list.slice(index + 1),
          ]
          : state.list,
      };
    }
    case REORDER_LIST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default contactsReducer;