import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';


class ContactForm extends Component {
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
      <Form layout="vertical" onSubmit={this.onSubmit}>
        <Form.Item label="First Name">
          <Input
            name="firstName"
            value={firstName}
            onChange={this.onChange}
          />
        </Form.Item>

        <Form.Item label="Last Name">
          <Input
            name="lastName"
            value={lastName}
            onChange={this.onChange}
          />
        </Form.Item>

        <Form.Item label="Phone">
          <Input
            name="phone"
            value={phone}
            onChange={this.onChange}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            value={email}
            onChange={this.onChange}
          />
        </Form.Item>

        <Form.Item label="Birth date">
          <Input
            name="birthDate"
            value={birthDate}
            onChange={this.onChange}
          />
        </Form.Item>

        <button className="btn btn--block">Save</button>
      </Form>
    );
  }
}

export default ContactForm;