import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import moment from 'moment';
import { Modal } from 'antd';

import ContactForm from '../components/ContactForm';
import sortedContacts from '../store/selectors/sortedContacts';
import { addContact, deleteContact, editContact, reorderList } from '../store/actions/contacts';
import SortableList from '../components/sortable/SortableList';


class ContactsList extends Component {
  state = {
    isPopupFormOpen: false,
    currentContactForEditing: null,
  };

  static propTypes = {
    contacts: PropTypes.array,
    addContact: PropTypes.func,
    editContact: PropTypes.func,
    deleteContact: PropTypes.func,
    reorderList: PropTypes.func,
  };

  showModal = () => {
    this.setState(() => ({
      isPopupFormOpen: true,
    }));
  };

  hideModal = () => {
    this.setState(() => ({
      isPopupFormOpen: false,
      currentContactForEditing: null,
    }));
  };

  handleContactCreating = () => {
    this.setState(() => ({
      currentContactForEditing: null,
    }), this.showModal);
  };

  handleContactEditing = (contact) => {
    this.setState(() => ({
      currentContactForEditing: {
        ...contact,
        birthDate: moment(contact.birthDate),
      },
    }), this.showModal);
  };

  handleContactDeleting = (index) => {
    this.props.deleteContact(index);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { contacts } = this.props;
    const items = arrayMove(
      contacts,
      oldIndex,
      newIndex,
    )
      .map((contact, index) => ({
        ...contact,
        position: index,
      }));

    this.props.reorderList(items);
  };

  renderContacts = () => {
    const { contacts } = this.props;

    return (
      <SortableList
        items={contacts}
        onSortEnd={this.onSortEnd}
        handleContactEditing={this.handleContactEditing}
        handleContactDeleting={this.handleContactDeleting}
        axis="xy"
      />
    );
  };

  render() {
    const { isPopupFormOpen, currentContactForEditing } = this.state;
    const { editContact, addContact } = this.props;
    const isContactExisting = Boolean(currentContactForEditing && currentContactForEditing.id);
    const submitHandler = isContactExisting
      ? editContact
      : addContact;

    return (
      <div>
        <h1 className="text-center">Contacts List</h1>

        {this.renderContacts()}

        <div className="btn-wrapper">
          <button
            className="btn btn--block card__btn"
            onClick={this.handleContactCreating}
          >
            Create contact
          </button>

          <Modal
            visible={isPopupFormOpen}
            width={900}
            bodyStyle={{ paddingTop: '50px' }}
            header={null}
            footer={null}
            onCancel={this.hideModal}
            destroyOnClose
          >
            <ContactForm
              closeModalFn={this.hideModal}
              submitHandler={submitHandler}
              contact={currentContactForEditing}
              isContactExisting={isContactExisting}
            />
          </Modal>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: sortedContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  addContact: contact => dispatch(addContact(contact)),
  editContact: contact => dispatch(editContact(contact)),
  deleteContact: index => dispatch(deleteContact(index)),
  reorderList: newList => dispatch(reorderList(newList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);