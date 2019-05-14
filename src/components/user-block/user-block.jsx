import React from "react";
import PropTypes from "prop-types";

const UserBlock = (props) => {
  const {avatarLink} = props;

  return (
    <div className="user-block">
      <div className="user-block__avatar">
        <img src={avatarLink} alt="User avatar" width="63" height="63" />
      </div>
    </div>
  );
};

UserBlock.propTypes = {
  avatarLink: PropTypes.string.isRequired
};

export default UserBlock;
