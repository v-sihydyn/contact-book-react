import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import { Button, Popconfirm } from 'antd';

const SortableItem = SortableElement(({ contact, contactIndex, handleContactEditing, handleContactDeleting }) =>
  <li className="cards__item">
    <div className="card">
      <div className="card__header">
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleContactDeleting(contactIndex)}
        >
          <Button shape="circle" icon="delete" />
        </Popconfirm>

      </div>

      <div className="card__content">
        <div className="card__title text-center">{`${contact.firstName} ${contact.lastName}`}</div>

        <p className="card__text">{contact.phone}</p>
        <p className="card__text">{contact.email}</p>


        <button
          className="btn btn--block"
          onClick={() => handleContactEditing(contact)}
        >
          Edit
        </button>
      </div>
    </div>
  </li>
);

SortableItem.propTypes = {
  contact: PropTypes.object,
  contactIndex: PropTypes.number,
  handleContactEditing: PropTypes.func,
  handleContactDeleting: PropTypes.func,
};

export default SortableItem;