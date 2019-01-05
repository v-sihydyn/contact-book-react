import React from 'react';

import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="cards">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} contact={value} />
      ))}
    </ul>
  );
});

export default SortableList;