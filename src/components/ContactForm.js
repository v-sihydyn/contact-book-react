import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContactForm extends Component {
  state = {
    firstName: this.props.contact ? this.props.contact.firstName : '',
    lastName: this.props.contact ? this.props.contact.lastName : '',
    phone: this.props.contact ? this.props.contact.phone : '',
    birthDate: this.props.contact ? this.props.contact.birthDate : '',
    email: this.props.contact ? this.props.contact.email : '',
  };

  static propTypes = {
    contact: PropTypes.object,
    submitHandler: PropTypes.func,
    closeModalFn: PropTypes.func,
  };

  onChange = (e) => {
    e.persist();
    const changedField = e.target.name;

    this.setState(() => ({
      [changedField]: e.target.value
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.submitHandler({
      ...this.props.contact,
      ...this.state,
    })
      .then(() => this.props.closeModalFn());
  };

  render() {
    const { firstName, lastName, phone, email, birthDate } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone number</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={this.onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">Birth date</label>
          <input
            type="text"
            name="birthDate"
            value={birthDate}
            onChange={this.onChange}
          />
        </div>

        <img src="" alt=""/>

        <button>Save</button>
      </form>
    );
  }
};