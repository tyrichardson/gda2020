import React, { Component } from 'react';
import { connect } from 'react-redux';

import FavoritesPageList from './FavoritesPageList';

const mapStateToProps = state => ({
  user: state.user,
  state
});

class FavoritesPage extends Component {
  
  componentDidMount() {
    this.props.dispatch({
      type:'GET_WRITER_STORIES_SAGA'
    });
    this.props.dispatch({
      type:'GET_FAVORITES'
    })
  }

  render() {

    const favoritesPageList = this.props.state.getFavorites.map((story) => {
      return (<FavoritesPageList key={story.id} story={story}/>)
    })

    let content = null;

    if (this.props.state.user.username) {
      content = (
        <div>

          <div id="welcome">
            <h3>
            {this.props.state.user.username }'s favorite's page
            </h3>
          </div>

          <section id="favorites">
            <h4>Your Favorites</h4>
            { favoritesPageList }
          </section>
        </div>
      );
    } 

    return (
      <div>
        { content }
      </div>
    );
  }
}



// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FavoritesPage);

