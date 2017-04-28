import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class DeletePic extends Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    if (this.props.handleDelete) {
       return this.props.handleDelete(this.props.url);
    }
  }

  render() {
    return (
      <Button type="button" className="close" onClick={this.handleDelete}>×</Button>
    );
  }
}

export default DeletePic;
