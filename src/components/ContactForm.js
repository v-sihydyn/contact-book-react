import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
import InputMask from 'inputmask';
import Dropzone from 'react-dropzone';

import fileToBase64 from "../helpers/fileToBase64";
import '../styles/dropzone.css';


class ContactForm extends Component {
  state = {
    firstName: this.props.contact ? this.props.contact.firstName : '',
    lastName: this.props.contact ? this.props.contact.lastName : '',
    phone: this.props.contact ? this.props.contact.phone : '',
    birthDate: this.props.contact ? this.props.contact.birthDate : moment('01.01.1990', 'DD.MM.YYYY'),
    email: this.props.contact ? this.props.contact.email : '',
    image: this.props.contact ? this.props.contact.image : '',
  };

  static propTypes = {
    contact: PropTypes.object,
    submitHandler: PropTypes.func,
    closeModalFn: PropTypes.func,
    isContactExisting: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.phoneInput = React.createRef();
  }

  componentDidMount() {
    InputMask({
      showMaskOnHover: false,
      mask: '+38 (999) 999-99-99',
    }).mask(this.phoneInput.current.input)
  }

  onChange = (e) => {
    e.persist();
    const changedField = e.target.name;

    this.setState(() => ({
      [changedField]: e.target.value
    }));
  };

  onDateChange = (date) => {
    this.setState(() => ({
      birthDate: date,
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

  onDrop = (acceptedFiles) => {
    fileToBase64(acceptedFiles[0])
      .then((resultImage) => {
        this.setState(() => ({
          image: resultImage,
        }));
      });
  };

  renderImagePreview = () => {
    return (
      <img
        src={this.state.image}
        title='Click to upload new image'
        alt=''
      />
    );
  };

  renderDropzonePlaceholder = () => {
    return (
      <div className="dropzone-content">
        <p className="main-line">Drag&amp;Drop files here</p>
        <p className="or-line">or</p>
        <p>
          <button type="button" className="browse-button">
            Browse files
          </button>
        </p>
      </div>
    );
  };

  render() {
    const { firstName, lastName, phone, email, birthDate } = this.state;
    const { isContactExisting } = this.props;

    return (
      <Form layout="vertical" onSubmit={this.onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="First Name">
              <Input
                name="firstName"
                value={firstName}
                onChange={this.onChange}
                required
              />
            </Form.Item>

            <Form.Item label="Last Name">
              <Input
                name="lastName"
                value={lastName}
                onChange={this.onChange}
                required
              />
            </Form.Item>

            <Form.Item label="Phone">
              <Input
                name="phone"
                value={phone}
                onChange={this.onChange}
                ref={this.phoneInput}
                placeholder="+38 (___) ___-__-__"
                required
              />
            </Form.Item>

            <Form.Item label="Email">
              <Input
                type="email"
                name="email"
                value={email}
                onChange={this.onChange}
              />
            </Form.Item>

            <Form.Item label="Birth date">
              <DatePicker
                format={'DD.MM.YYYY'}
                value={birthDate}
                onChange={this.onDateChange}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Dropzone
              accept="image/*"
              onDrop={this.onDrop}
              multiple={false}
            >
              {({getRootProps, getInputProps, isDragActive}) => {
                return (
                  <div
                    {...getRootProps()}
                    className='react-dropzone-styled'
                  >
                    <input {...getInputProps()} />

                    {!!this.state.image && this.renderImagePreview()}

                    {!this.state.image && this.renderDropzonePlaceholder()}
                  </div>
                )
              }}
            </Dropzone>
          </Col>
        </Row>

        <Row type='flex' justify='center'>
          <Col span={8}>
            <button className="btn btn--block">
              {isContactExisting ? 'Save' : 'Add'} contact
            </button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ContactForm;