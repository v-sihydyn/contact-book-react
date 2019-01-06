import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';

import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ items, handleContactEditing }) => {
  return (
    <ul className="cards">
      {items.map((value, index) => (
        <SortableItem
          handleContactEditing={handleContactEditing}
          key={`item-${index}`}
          index={index}
          contact={value}
        />
      ))}
    </ul>
  );
});

SortableList.propTypes = {
  items: PropTypes.array,
  handleContactEditing: PropTypes.func,
};

export default SortableList;