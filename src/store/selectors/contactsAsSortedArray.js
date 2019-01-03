import { createSelector } from 'reselect';

const contactsAsSortedArray = createSelector(
  state => state.contacts.list,
  contactsList => (
    Object.keys(contactsList)
      .map((key) => {
        return contactsList[key];
      })
      .sort((a, b) => a.position - b.position)
  ),
);

export default contactsAsSortedArray;