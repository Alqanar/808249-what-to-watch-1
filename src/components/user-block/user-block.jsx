import React from "react";
import PropTypes from "prop-types";


const avatarBlock = (avatarLink) => (
  <div className="user-block__avatar">
    <img src={avatarLink} alt="User avatar" width="63" height="63" />
  </div>
);

const signInLink = (moveToAuth) => (
  <a onClick={moveToAuth} href="#" className="user-block__link">Sign in</a>
);

const UserBlock = (props) => {
  const {avatarLink, isAuth, moveToAuth} = props;

  return (
    <div className="user-block">
      {isAuth ? avatarBlock(avatarLink) : signInLink(moveToAuth)}
    </div>
  );
};

UserBlock.propTypes = {
  avatarLink: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
  moveToAuth: PropTypes.func.isRequired
};

export default UserBlock;
