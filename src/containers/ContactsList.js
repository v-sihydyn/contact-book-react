import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContactForm from "../components/ContactForm";
import contactsAsSortedArray from "../store/selectors/contactsAsSortedArray";
import { addContact, editContact } from "../store/actions/contacts";

class ContactsList extends Component {
  state = {
    isPopupFormOpen: false,
    currentContactForEditing: null,
  };

  static propTypes = {
    denormalizedContacts: PropTypes.array,
    normalizedContacts: PropTypes.object,
    addContact: PropTypes.func,
    editContact: PropTypes.func,
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

  handleContactEditing = (id) => {
    const { normalizedContacts } = this.props;

    this.setState(() => ({
      currentContactForEditing: { ...normalizedContacts[id] },
    }), this.showModal);
  };

  renderContacts = () => {
    const { denormalizedContacts } = this.props;

    return (
      <div>
        { denormalizedContacts.map((contact) => (
          <section key={contact.id}>
            <p>{contact.firstName}</p>
            <button onClick={() => this.handleContactEditing(contact.id)}>Edit</button>
          </section>
        )) }
      </div>
    );
  };

  render() {
    const { isPopupFormOpen, currentContactForEditing } = this.state;
    const { editContact, addContact } = this.props;
    const submitHandler = (currentContactForEditing && currentContactForEditing.id)
      ? editContact
      : addContact;

    return (
      <div>
        <h1>Contacts List</h1>

        {this.renderContacts()}

        <button
          onClick={this.handleContactCreating}
        >
          Create contact
        </button>

        <Modal
          appElement={document.getElementById('root')}
          isOpen={isPopupFormOpen}
          onRequestClose={this.hideModal}
        >
          <ContactForm
            contact={currentContactForEditing}
            submitHandler={submitHandler}
            closeModalFn={this.hideModal}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  denormalizedContacts: contactsAsSortedArray(state),
  normalizedContacts: state.contacts.list,
});

const mapDispatchToProps = (dispatch) => ({
  addContact: contact => dispatch(addContact(contact)),
  editContact: contact => dispatch(editContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);