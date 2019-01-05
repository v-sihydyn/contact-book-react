import React from 'react';

import { SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ contact }) =>
  <li className="cards__item">
    <div className="card">
      <div className="card__content">
        <div className="card__title">{`${contact.firstName} ${contact.lastName}`}</div>

        <p className="card__text">{contact.phone}</p>
        <p className="card__text">{contact.email}</p>
      </div>
    </div>
  </li>
);

export default SortableItem;