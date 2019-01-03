import initialData from '../initialData';

const contactsReducer = (state = initialData.contacts, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default contactsReducer;