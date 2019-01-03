import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContactForm from "../components/ContactForm";
import contactsAsSortedArray from "../store/selectors/contactsAsSortedArray";

class ContactsList extends Component {
  state = {
    isPopupFormOpen: false,
  };

  static propTypes = {
    denormalizedContacts: PropTypes.array,
  };

  showModal = () => {
    this.setState(() => ({
      isPopupFormOpen: true,
    }));
  };

  hideModal = () => {
    this.setState(() => ({
      isPopupFormOpen: false,
    }));
  };

  renderContacts = () => {
    const { denormalizedContacts } = this.props;

    return (
      <div>
        { denormalizedContacts.map((contact) => (
          <section key={contact.id}>
            <p>{contact.firstName}</p>
          </section>
        )) }
      </div>
    );
  };

  render() {
    const { isPopupFormOpen } = this.state;

    return (
      <div>
        <h1>Contacts List</h1>

        {this.renderContacts()}

        <button onClick={this.showModal}>Create contact</button>

        <Modal
          appElement={document.getElementById('root')}
          isOpen={isPopupFormOpen}
          onRequestClose={this.hideModal}
        >
          <ContactForm />
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  denormalizedContacts: contactsAsSortedArray(state),
});

export default connect(mapStateToProps)(ContactsList);