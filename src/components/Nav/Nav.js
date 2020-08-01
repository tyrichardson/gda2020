import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <div>
    <Link to="/home">
      {!props.state.user.username ? <h2 className="nav-title">Good Deeds Anonymous</h2> : <h2 className="nav-title">Good Deeds Anonymous USA welcomes you, {props.state.user.username}</h2> }
    </Link>
    </div>

    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Write' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/memberReadingPage">
             Read
          </Link>
          <Link className="nav-link" to="/archive">
            Archive
          </Link>
          <Link className="nav-link" to="/favorites">
            Favorites
          </Link>
          <LogOutButton className="nav-link"/>
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/readPage">
        Public
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  state
});

export default connect(mapStateToProps)(Nav);
