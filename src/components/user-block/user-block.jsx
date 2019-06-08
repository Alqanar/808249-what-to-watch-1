import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


const avatarBlock = (avatarLink) => (
  <div className="user-block__avatar">
    <img src={avatarLink} alt="User avatar" width="63" height="63" />
  </div>
);

const signInLink = () => (
  <Link to='/login' className="user-block__link">Sign in</Link>
);

const UserBlock = (props) => {
  const {avatarLink, isAuth} = props;

  return (
    <div className="user-block">
      {isAuth ? avatarBlock(avatarLink) : signInLink()}
    </div>
  );
};

UserBlock.propTypes = {
  avatarLink: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired
};

export default UserBlock;
