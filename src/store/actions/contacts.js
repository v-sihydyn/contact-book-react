import uuidv4 from 'uuid/v4';

import { ADD_CONTACT, EDIT_CONTACT, REORDER_LIST } from '../action-types/contacts';

export const addContact = contact => dispatch => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: ADD_CONTACT,
        payload: {
          data: {
            ...contact,
            id: uuidv4(),
          },
        },
      });

      resolve();
    }, 300);
  });
};

export const editContact = contact => dispatch => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: EDIT_CONTACT,
        payload: {
          data: contact,
        },
      });

      resolve();
    }, 300);
  });
};

export const reorderList = newList => ({
  type: REORDER_LIST,
  payload: newList,
});