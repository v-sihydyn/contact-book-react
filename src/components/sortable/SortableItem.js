import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ contact, handleContactEditing }) =>
  <li className="cards__item">
    <div className="card">
      <div className="card__content">
        <div className="card__title text-center">{`${contact.firstName} ${contact.lastName}`}</div>

        <p className="card__text">{contact.phone}</p>
        <p className="card__text">{contact.email}</p>



        <button
          className="btn btn--block"
          onClick={() => handleContactEditing(contact.id)}
        >
          Edit
        </button>
      </div>
    </div>
  </li>
);

SortableItem.propTypes = {
  contact: PropTypes.object,
  handleContactEditing: PropTypes.func,
};

export default SortableItem;