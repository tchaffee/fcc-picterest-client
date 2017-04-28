import React, { Component } from 'react';
import './Pics.css';
import DeletePic from './DeletePic';
import LikePic from './LikePic';
import { Link } from 'react-router-dom';

import Masonry from 'react-masonry-component';

class Pics extends Component {

  constructor (props) {
    super(props);

    this.state = {
      data: [],
      isFetching: true
    };

    this.loadData = this.loadData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);    
    this.handleLike = this.handleLike.bind(this);    
  }

  componentWillMount () {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataGetter !== nextProps.dataGetter) {
      this.loadData(nextProps);
    }
  }

  loadData(props) {
    const { dataGetter } = props;

    this.setState({ isFetching: true });

    dataGetter(props.match.params.userid)
    .then(data => {
      console.log('done fetching...');
      this.setState({
        data: data.pics,
        isFetching: false
      });
    });
  }

  handleDelete(url) {
    return this.props.handleDelete(url)
    .then( () => {
      this.loadData(this.props);
    })
    .catch(reason => {
      if ('Error: Unauthorized' === reason.toString()) {
        this.props.history.replace('/notauthorized');
      }
    });
  }

  handleLike(id) {
    return this.props.handleLike(id)
    .then( () => {
      console.log('handled like... reloading data.');
      this.loadData(this.props);
    })
    .catch(reason => {
      if ('Error: Unauthorized' === reason.toString()) {
        this.props.history.replace('/notauthorized');
      }
    });
  }

  render() {

    let picsList = [];
    
    if (this.state.data) {
      picsList = this.state.data.map( (el, index) => {
        let deletePic = null;
 
        let owner = (
          <div className="picUser">
            <Link to={`/pics/${el.owner.external_id}`}>
              <img alt={el.owner.name} className="img-circle userPic" src={el.owner.picture} />
              <span>{el.owner.name}</span>
            </Link>
          </div>
        );

        if (this.props.location.pathname === '/mypics') {
          deletePic = <DeletePic handleDelete={this.handleDelete} url={el.url} />;
        }

        return (
            <li key={el._id} className="picContainer">
              {deletePic}
              <span className="pic">
                <img alt={el.description} className="picItem" src={el.url} />
              </span>
              <p>{el.description}</p>
              {owner}
              <LikePic handleLike={this.handleLike} id={el._id} count={el.likes.length} />
            </li>
        );
      });
    }
  
    return (
      <div className="picList">
        <Masonry
            className={'my-gallery-class'} // default ''
            elementType={'ul'} // default 'div'
        >
          {picsList}
        </Masonry>
      </div>
    );
  }
}

export default Pics;
