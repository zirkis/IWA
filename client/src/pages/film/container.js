import React, {Component} from 'react';
import {connect} from 'react-redux';

import View from './view';
import {getFilm} from '../../actions/film/get-film';

@connect(undefined,
  dispatch => {
    return {
      getFilmAction: id => {
        return dispatch(getFilm(id));
      }
    }
  })
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      film: null
    };
  }
  componentWillReceiveProps(nextProps) {
    const lastId = this.props.routeParams.id;
    const newId = nextProps.routeParams.id;
    if (this.state.loaded && lastId !== newId) {
      this.setState({loaded: false});
      this._loadMedia(newId);
    }
  }
  componentWillMount() {
    const {id} = this.props.routeParams;
    this._loadMedia(id);
  }
  _loadMedia(_id) {
    const filter = {simple: {_id}};
    return this.props.getFilmAction(filter)
      .then(film => {
        this.setState({
          loaded: true,
          film
        });
      });
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <View film={this.state.film}/>
    );
  }
}

export default Container;
