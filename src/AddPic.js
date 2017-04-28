import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';

class AddPic extends Component {

  constructor (props) {
    super(props);

    this.state = {
      showModal: true,
      url: '',
      description: ''
    }

    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    });
  }

  close() {
    this.setState({ showModal: false });
    this.props.history.goBack();
  }

  save() {
    // TODO: Save the pic.
    this.props.addPic(this.state.url, this.state.description);
    this.setState({ showModal: false });
    this.props.history.goBack();
  }  

  render() {
    return (
      <div className="static-modal">
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Save a picture</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup controlId="formUrl">
                 <FormControl
                    type="text"
                    name="url"
                    value={this.state.url}
                    placeholder="URL for image"
                    onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescription">
                 <FormControl
                    type="text"
                    name="description"
                    value={this.state.description}
                    placeholder="Description"
                    onChange={this.handleInputChange}
                />
              </FormGroup>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button onClick={this.save} bsStyle="primary">Save</Button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }

};

export default AddPic;
