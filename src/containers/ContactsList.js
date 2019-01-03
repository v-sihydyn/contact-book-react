import React, { Component } from 'react';
import Modal from 'react-modal';
import ContactForm from "../components/ContactForm";

export default class ContactsList extends Component {
  state = {
    isPopupFormOpen: false,
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

  render() {
    const { isPopupFormOpen } = this.state;

    return (
      <div>
        <h1>Contacts List</h1>

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