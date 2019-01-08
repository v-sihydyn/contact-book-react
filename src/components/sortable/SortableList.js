import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';

import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ items, handleContactEditing, handleContactDeleting }) => {
  return (
    <ul className="cards">
      {items.map((value, index) => (
        <SortableItem
          handleContactEditing={handleContactEditing}
          handleContactDeleting={handleContactDeleting}
          key={`item-${index}`}
          index={index}
          contactIndex={index}
          contact={value}
        />
      ))}
    </ul>
  );
});

SortableList.propTypes = {
  items: PropTypes.array,
  handleContactEditing: PropTypes.func,
  handleContactDeleting: PropTypes.func,
};

export default SortableList;