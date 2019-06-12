import * as React from "react";

import {Link} from "react-router-dom";


interface IProps {
  avatarLink: string;
  isAuth: boolean;
}

const avatarBlock = (avatarLink): React.ReactElement => (
  <div className="user-block__avatar">
    <img src={avatarLink} alt="User avatar" width="63" height="63" />
  </div>
);

const signInLink = (): React.ReactElement => (
  <Link to='/login' className="user-block__link">Sign in</Link>
);

const UserBlock: React.FC<IProps> = (props): React.ReactElement => {
  const {avatarLink, isAuth} = props;

  return (
    <div className="user-block">
      {isAuth ? avatarBlock(avatarLink) : signInLink()}
    </div>
  );
};

export default UserBlock;
