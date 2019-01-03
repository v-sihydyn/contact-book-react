import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContactForm from "../components/ContactForm";
import contactsAsSortedArray from "../store/selectors/contactsAsSortedArray";

class ContactsList extends Component {
  state = {
    isPopupFormOpen: false,
    currentContactForEditing: null,
  };

  static propTypes = {
    denormalizedContacts: PropTypes.array,
    normalizedContacts: PropTypes.object,
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
      currentContactForEditing: normalizedContacts[id],
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

    return (
      <div>
        <h1>Contacts List</h1>

        {this.renderContacts()}

        <button onClick={this.handleContactCreating}>Create contact</button>

        <Modal
          appElement={document.getElementById('root')}
          isOpen={isPopupFormOpen}
          onRequestClose={this.hideModal}
        >
          <ContactForm
            contact={currentContactForEditing}
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

export default connect(mapStateToProps)(ContactsList);