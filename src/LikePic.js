import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './LikePic.css';

class LikePic extends Component {

  constructor(props) {
    super(props);

    this.handleLike = this.handleLike.bind(this);
  }

  handleLike(event) {
    event.preventDefault();
    if (this.props.handleLike) {
       return this.props.handleLike(this.props.id);
    }
  }

  render() {
    return (
      <Button type="button" className="like" onClick={this.handleLike}>
        <span className="glyphicon glyphicon-heart likeSymbol"></span>
        <span className="likeCount">{this.props.count}</span>
      </Button>
    );
  }
}

export default LikePic;
