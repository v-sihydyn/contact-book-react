import uuidv4 from 'uuid/v4';

import { ADD_CONTACT, EDIT_CONTACT } from '../action-types/contacts';

export const addContact = (contact) => (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: ADD_CONTACT,
        payload: {
          ...contact,
          id: uuidv4(),
        },
      });

      resolve();
    }, 300);
  });
};

export const editContact = (contact) => (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: EDIT_CONTACT,
        payload: contact,
      });

      resolve();
    }, 300);
  });
};