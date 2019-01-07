import { createSelector } from 'reselect';

const sortedContacts = createSelector(
  state => state.contacts.list,
  contactsList => contactsList
    .sort((a, b) => a.position - b.position),
);

export default sortedContacts;