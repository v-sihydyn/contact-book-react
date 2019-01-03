import React, { Component } from 'react';

export default class ContactForm extends Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="first-name">First name</label>
          <input
            type="text"
            name="first-name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="last-name">Last name</label>
          <input
            type="text"
            name="last-name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="first-name">Phone number</label>
          <input
            type="text"
            name="phone-number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email-address">Email address</label>
          <input
            type="text"
            name="email-address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="birth-date">Birth date</label>
          <input
            type="text"
            name="birth-date"
          />
        </div>

        <img src="" alt=""/>

        <button>Save</button>
      </div>
    );
  }
};